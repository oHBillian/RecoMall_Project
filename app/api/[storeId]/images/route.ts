// app/api/[storeId]/products/[productId]/images/route.ts
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { supabase } from "@/lib/supabase";
import prismadb from "@/lib/prismadb";


export async function POST(
  req: Request,
  { params }: { params: { storeId: string; productId: string } }
) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("image") as File;

    if (!file) {
      return new NextResponse("No file uploaded", { status: 400 });
    }

    // ตรวจสอบว่า store เป็นของ user นี้จริงๆ
    const storeByUser = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId
      }
    });

    if (!storeByUser) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    // ตรวจสอบว่า product อยู่ใน store นี้จริงๆ
    const product = await prismadb.product.findFirst({
      where: {
        id: params.productId,
        storeId: params.storeId
      }
    });

    if (!product) {
      return new NextResponse("Product not found", { status: 404 });
    }

    // สร้างชื่อไฟล์ที่ไม่ซ้ำกัน
    const fileName = `${params.storeId}/${params.productId}/${Date.now()}-${file.name}`;

    // อัพโหลดไฟล์ไปที่ Supabase Storage
    const { data, error } = await supabase
      .storage
      .from('product-images')
      .upload(fileName, file);

    if (error) {
      console.error('Supabase Storage Error:', error);
      return new NextResponse("Error uploading file", { status: 500 });
    }

    // สร้าง public URL
    const { data: { publicUrl } } = supabase
      .storage
      .from('product-images')
      .getPublicUrl(data.path);

    // บันทึก URL ลงฐานข้อมูล
    const image = await prismadb.image.create({
      data: {
        url: publicUrl,
        productId: params.productId
      }
    });

    return NextResponse.json(image);
  } catch (error) {
    console.log('[PRODUCT_IMAGE_UPLOAD]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; productId: string; imageId: string } }
) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Verify store ownership
    const storeByUser = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId
      }
    });

    if (!storeByUser) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    // Get image details before deletion
    const image = await prismadb.image.findUnique({
      where: {
        id: params.imageId,
        productId: params.productId
      }
    });

    if (!image) {
      return new NextResponse("Image not found", { status: 404 });
    }

    // Extract file path from the URL
    const urlParts = image.url.split('product-images/');
    if (urlParts.length < 2) {
      return new NextResponse("Invalid image URL format", { status: 400 });
    }
    const filePath = urlParts[1];

    // Delete from Supabase storage
    const { error: supabaseError } = await supabase
      .storage
      .from('product-images')
      .remove([filePath]);

    if (supabaseError) {
      console.error('Supabase Storage Error:', supabaseError);
      return new NextResponse("Error deleting file from storage", { status: 500 });
    }

    // Delete image record from database
    await prismadb.image.delete({
      where: {
        id: params.imageId
      }
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.log('[PRODUCT_IMAGE_DELETE]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

// ดึงรายการรูปภาพ
export async function GET(
  req: Request,
  { params }: { params: { storeId: string; productId: string } }
) {
  try {
    const images = await prismadb.image.findMany({
      where: {
        productId: params.productId
      }
    });

    return NextResponse.json(images);
  } catch (error) {
    console.log('[GET_PRODUCT_IMAGES]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { auth } from "@clerk/nextjs/server";

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = await auth();
    const { storeId } = await params;
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return new NextResponse("No file uploaded", { status: 400 });
    }

    // สร้างชื่อไฟล์ที่ไม่ซ้ำกัน
    const fileName = `${storeId}/${Date.now()}-${file.name}`;

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

    return NextResponse.json({ url: publicUrl });
  } catch (error) {
    console.log('[FILE_UPLOAD]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
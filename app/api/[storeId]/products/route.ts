import prismadb from "@/lib/prismadb";
import { supabase } from "@/lib/supabase";
import { auth } from "@clerk/nextjs/server";
// import { Decimal } from "@prisma/client/runtime/library";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const {storeId} = await params
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // ตรวจสอบว่า store เป็นของ user นี้จริงๆ
    const storeByUser = await prismadb.store.findFirst({
      where: {
        id: storeId,
        userId
      }
    });

    if (!storeByUser) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const body = await req.json();
    const { name, description, price, categoryId, subcategoryId, Image } = body;

    if(!name || !description || !price || !categoryId || !subcategoryId || !Image){
      return new NextResponse("Please fill in all required fields", { status: 400 });
    }
    // สร้าง product พร้อมกับ images
    const product = await prismadb.product.create({
      data: {
        name,
        description,
        price,
        categoryId,
        subcategoryId,
        storeId: storeId,
        isFeatured: false,
        Images: {
          create: Image // array of { url: string }
        }
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log('[PRODUCT_CREATE]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; productId: string } }
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

    // Get all images for the product
    const product = await prismadb.product.findUnique({
      where: {
        id: params.productId,
        storeId: params.storeId
      },
      include: {
        Images: true
      }
    });

    if (!product) {
      return new NextResponse("Product not found", { status: 404 });
    }

    // Delete all images from Supabase storage
    for (const image of product.Images) {
      const urlParts = image.url.split('product-images/');
      if (urlParts.length >= 2) {
        const filePath = urlParts[1];
        await supabase
          .storage
          .from('product-images')
          .remove([filePath]);
      }
    }

    // Delete product (this will cascade delete the images in the database)
    await prismadb.product.delete({
      where: {
        id: params.productId
      }
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.log('[PRODUCT_DELETE]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

// export async function POST(req:Request,{params} : {params : {storeId: string}, }) {
//     try {
//         // const { storeId } = await params
//         const body = await req.json()
//         const { storeId,name,description,price,Image,categoryId,subcategoryId } = body;

//         if (!name) {
//             return new NextResponse("Name is required", { status: 400 });
//         }
//         if (!description) {
//             return new NextResponse("Description is required", { status: 400 });
//         }
//         if (!price) {
//             return new NextResponse("Price is required", { status: 400 });
//         }
//         if (!categoryId) {
//             return new NextResponse("Category ID is required", { status: 400 });
//         }
//         if (!subcategoryId) {
//             return new NextResponse("Subcategory ID is required", { status: 400 });
//         }

//         const product = await prismadb.product.create({
//             data : {
//                 storeId: storeId,
//                 name,
//                 description,
//                 price: new Decimal(price),
//                 categoryId,
//                 subcategoryId,
//                 Image: {
//                     create: Image
//                 },
//             }
//         })

//         return NextResponse.json(product)
//     } catch (error) {
//         console.log("[MainCategories POST]", error)
//         return new NextResponse("Interral error", {status: 500})
//     }
// }
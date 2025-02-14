import prismadb from "@/lib/prismadb";
import React from "react";
import CreateProductUi from "./component/ui/createProductUi";
import { PruductType } from "./component/columns";
import ProductClient from "./component/client";


const Products = async ({ params }: { params: { storeId: string } }) => {

    const {storeId} = await params;
    const products = await prismadb.product.findMany({
      where: {
        storeId: storeId
      },
      include: {
        category: {
          select: {
            name: true
          }
        },
        subcategory: {
          select: {
            name: true
          }
        },
        Images: {
          select: {
            url: true
          }
        }
      }
    });
    
  const formattedProducts: PruductType[] = products.map((item) => ({
    id: item.id,
    name: item.name,
    description: item.description,
    price: item.price.toString(),
    isFeatured: item.isFeatured,
    categoryName: item.category.name,
    subcategoryName: item.subcategory.name // เพิ่ม subcategory name ถ้าต้องการ
  }));
  return (
    <div className="w-full">
      <CreateProductUi />
      <hr className="h-1 mt-3 mb-3 border-gray-300"></hr>
          
          
          <ProductClient data={formattedProducts} />
    </div>
  );
};

export default Products;

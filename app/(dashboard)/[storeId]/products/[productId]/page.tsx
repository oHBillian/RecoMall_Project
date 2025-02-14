import prismadb from '@/lib/prismadb';
import React from 'react'
import ProductForm from './component/product-form';
import { formatter } from '@/lib/utils';

const ProductsPage = async({ params }: { params: { storeId: string,productId: string } }) => {
  const {productId,storeId} = await params;
  //ดึง categories เพื่อเอาไปแสดงใน Selector ให้ลูป category ออกมาเพื่อเลือกหมวดหมู่
  const CategoriesData = await prismadb.category.findMany({
    where: {
      storeId: storeId,
    },
    include: {
      subcategories: true,
    },
  }); 
  
  // แปลงข้อมูลเพื่อส่งไปที่ SelecCategory
  const categories = CategoriesData.map(({id, name, storeId, createdAt, subcategories}) => ({
    id,
    name,
    storeId,
    createdAt: createdAt.toISOString(),
    subcategories: subcategories.map(sub => ({
      id: sub.id,
      name: sub.name,
      categoryId: sub.categoryId
    }))
  }));

  const subcategories = CategoriesData.flatMap(category => 
    category.subcategories.map(subcategory => ({
      id: subcategory.id,
      name: subcategory.name,
      categoriesId: category.id,
      categoryName: category.name,
    }))
  );

  const products = await prismadb.product.findFirst({
    where: {
      id: productId
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
      Images: true
    }
  });

  const productFormat = products
  ? {
      ...products,
      price: formatter.format(products.price.toNumber()),
      Images: products.Images.map(img => ({
        id: img.id,
        productId: img.productId,
        url: img.url,
        createdAt: img.createdAt,
        updatedAt: img.updatedAt
      }))
    }
  : null;

   

  return (
    <ProductForm categories={categories} subcategories={subcategories} innitialdata={productFormat}/>
  )
}

export default ProductsPage  
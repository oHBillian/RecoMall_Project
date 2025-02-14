import React from "react";
import SubcategoryClient from "./component/client";
import prismadb from "@/lib/prismadb";
import SubcategoryForm from "./component/subcategory-form";


const SubCategoryPage = async ({ params }: { params: { storeId: string } }) => {

  const { storeId } = await params;

  const CategoriesData = await prismadb.category.findMany({
    where: {
      storeId: storeId,
    },
    include: {
      subcategories: true,
    },
  });  

  console.log("CategoriesData", CategoriesData)
  const categories = CategoriesData.map(({id,name,storeId,createdAt}) => ({id,name,storeId,createdAt: createdAt.toISOString()}))

  const subcategories = CategoriesData.flatMap(category => 
    category.subcategories.map(subcategory => ({
      id: subcategory.id,
      name: subcategory.name,
      categoriesId: category.id,
      categoryName: category.name,
    }))
  );
  
  return (
    <div className="w-full">
      <div className="flex justify-between">
        <span className="font-semibold text-2xl">Create Sub Category</span>
      </div>
      <div className="mt-2">
        Create a main category to organize your products into broad groups, such
        as Kitchenware, Electronics, or Clothing
      </div>
      <hr className="h-1 mt-3 mb-3 border-gray-300"></hr>

      <SubcategoryForm data={categories}/>
      <SubcategoryClient data={subcategories} data2={categories}/>
    </div>
  );
};

export default SubCategoryPage;

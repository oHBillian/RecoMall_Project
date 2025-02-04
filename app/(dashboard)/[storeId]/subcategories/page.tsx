import React from "react";
import SubcategoryClient from "./component/client";
import prismadb from "@/lib/prismadb";
import SubcategoryForm from "./component/category-form";

const SubCategoryPage = async ({ params }: { params: { storeId: string } }) => {

  const { storeId } = await params;

  const categories = await prismadb.category.findMany({
    where: {
      storeId: storeId,
    },
  });
  const subcategory = await prismadb.category.findMany({
    where: {
      storeId: storeId,
    },
    include: {
      subcategories: true, // ดึง subcategories มาด้วย
    },
  });

  const subcategories = subcategory.flatMap(category => category.subcategories);
  console.log(categories);
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
      <SubcategoryClient data={subcategories} />
    </div>
  );
};

export default SubCategoryPage;

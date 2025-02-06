import React from "react";
import CategoryForm from "./component/category-form";
import CategoryClient from "./component/client";
import prismadb from "@/lib/prismadb";

const CategoryPage = async ({ params }: { params: { storeId: string } }) => {
  const { storeId } = await params;
  const maincategories = await prismadb.category.findMany({
    where: {
      storeId: storeId,
    },
  });


  return (
    <div className="w-full">
      <div className="flex justify-between">
        <span className="font-semibold text-2xl">Create Main Category</span>
      </div>
      <div className="mt-2">
        Create a main category to organize your products into broad groups, such
        as Kitchenware, Electronics, or Clothing
      </div>
      <hr className="h-1 mt-3 mb-3 border-gray-300"></hr>

      <CategoryForm />
      <CategoryClient data={maincategories} />
    </div>
  );
};

export default CategoryPage;

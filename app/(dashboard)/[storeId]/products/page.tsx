import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import React from "react";

const ProductsPage = () => {
  return (
    <div className="w-full">
      <div className="flex justify-between items-center">
        <div>
          <span className="font-semibold text-2xl">Create Products</span>
          <div className="mt-2">Create a Product description</div>
        </div>
        <div>
          <Button><Plus />Add New</Button>
        </div>
      </div>

      <hr className="h-1 mt-3 mb-3 border-gray-300"></hr>
      {/*     
          <CategoryForm />
          <CategoryClient data={maincategories} /> */}
    </div>
  );
};

export default ProductsPage;

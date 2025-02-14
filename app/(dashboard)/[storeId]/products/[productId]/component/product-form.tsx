"use client";

import { memo, useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Loader2, AlertCircle, ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { MainCategoriesType } from "../../../categories/component/columns";
import SelecCategoryProduct from "./ui/selectCategory";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";

import { Image as PrimaImage, Product } from "@prisma/client";
import SelecSubCategoryProduct from "./ui/selectSubcate";
import { SubCategoriesType } from "../../../subcategories/component/columns";
import { useDispatch } from "react-redux";
import { setIdCategory, setIdSubCategory } from "@/lib/slices/subCategoryValue";
const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  price: z.string().min(1, "Price is required"),
  categoryId: z.string().min(1, "Category ID is required"),
  subcategoryId: z.string().min(1, "Subcategory ID is required"),
});
interface SubcategoryFormprops {
  innitialdata:
    | (Product & {
        Images: PrimaImage[];
      })
    | null;
  categories: MainCategoriesType[];
  subcategories: SubCategoriesType[];
}

const selectCategoryId = (state: RootState) => state.selectorValue.categoryId;
const selectSubcategoryId = (state: RootState) => state.selectorValue.subcategoryId;

const ProductForm: React.FC<SubcategoryFormprops> = memo(
  ({ categories, innitialdata,subcategories }) => {
    console.log("innitialdata",innitialdata)

    const categoryId = useSelector(selectCategoryId);
    const subcategoryId = useSelector(selectSubcategoryId);

    const dispatch = useDispatch();
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        name: innitialdata?.name || "",
        description: innitialdata?.description || "",
        price: innitialdata?.price?.toString().replace("฿", "") || "",
        categoryId: "",
        subcategoryId: innitialdata?.subcategoryId?.toString() || "",
      },
    });

    //ถ้าไม่มี innitialdata ให้ set redux state เป็น null
    useEffect(() => {
      if (!innitialdata) {
        dispatch(setIdCategory(null));
        dispatch(setIdSubCategory(null));
      }
    },[dispatch, innitialdata])

    useEffect(() => {
      if (categoryId) {
        console.log("categoryId", categoryId);
        form.setValue("categoryId", categoryId.toString());
        form.setValue("subcategoryId", "");
        
      }
      if(subcategoryId){
        console.log("subcategoryId" , subcategoryId);
        form.setValue("subcategoryId", subcategoryId.toString());
      }
      
    }, [categoryId,subcategoryId,form,dispatch, innitialdata]);

    const params = useParams();
    const router = useRouter();
    const [images, setImages] = useState<File[]>([]);
    const [previewUrls, setPreviewUrls] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const onSelectCategory = (categoryId: string) => {
      form.setValue("categoryId", categoryId); // เพิ่มการ set ค่าให้ form
    };

    const onSelectSubcategory = (subcategoryId: string) => {
      form.setValue("subcategoryId", subcategoryId); // เพิ่มการ set ค่าให้ form
    };
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const files = Array.from(e.target.files);
        if (images.length + files.length > 5) {
          setError("Maximum 5 images allowed");
          return;
        }
        setImages((prevImages) => [...prevImages, ...files]);

        const newPreviewUrls = files.map((file) => URL.createObjectURL(file));
        setPreviewUrls((prevUrls) => [...prevUrls, ...newPreviewUrls]);
        setError(null);
      }
    };

    const handleRemoveImage = (index: number) => {
      setImages((prevImages) => prevImages.filter((_, i) => i !== index));
      URL.revokeObjectURL(previewUrls[index]);
      setPreviewUrls((prevUrls) => prevUrls.filter((_, i) => i !== index));
    };

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
      console.log();
      if (images.length === 0) {
        setError("At least one image is required");
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        // 1. Upload images to Supabase
        const imageUrls = await Promise.all(
          images.map(async (image) => {
            const formData = new FormData();
            formData.append("file", image);

            const response = await fetch(`/api/${params.storeId}/upload`, {
              method: "POST",
              body: formData,
            });

            if (!response.ok) {
              throw new Error(`Failed to upload ${image.name}`);
            }

            const data = await response.json();
            return { url: data.url };
          })
        );

        // 2. Create product with image URLs
        const productData = {
          name: values.name,
          description: values.description,
          price: parseFloat(values.price),
          categoryId: parseFloat(values.categoryId),
          subcategoryId: parseInt(values.subcategoryId),
          Image: imageUrls,
        };

        const res = await fetch(`/api/${params.storeId}/products`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(productData),
        });

        if (!res.ok) {
          const error = await res.text();
          throw new Error(error || "Failed to create product");
        }

        toast.success("Product created successfully");
        previewUrls.forEach((url) => URL.revokeObjectURL(url));
        router.push(`/${params.storeId}/products`);
        router.refresh();
      } catch (err) {
        console.error("Error:", err);
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setIsLoading(false);
      }
    };

    return (
      <div className="p-4 max-w-3xl mx-auto">
        <div className="flex mb-2 justify-between">
        <h1 className="text-2xl font-bold">
          {innitialdata ? "Edit Product" : "Add New Product"}
        </h1>
        <Button onClick={() => router.push(`/${params.storeId}/products`)}> <ArrowLeft/>Go Back</Button>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isLoading}
                      placeholder="Enter product name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField 
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <textarea className="border h-36 p-2"
                      {...field}
                      disabled={isLoading}
                      placeholder="Enter product description"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      disabled={isLoading}
                      placeholder="Enter price"
                      step="0.01"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-x-4">
            <SelecCategoryProduct
              defaultSelected={innitialdata?.categoryId}
              categories={categories}
              onSelect={onSelectCategory}
            />
 
            <SelecSubCategoryProduct
              defaultSelected={innitialdata?.subcategoryId}
              subcategories={subcategories}
              onSelect={onSelectSubcategory}
            />
            </div>

            <div className="space-y-4">
              <FormItem>
                <FormLabel>Product Images (Max 5)</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageChange}
                    disabled={isLoading || images.length >= 5}
                  />
                </FormControl>
              </FormItem>

              <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {images.map((image, index) => (
                  <div key={index} className="relative group">
                    <div className="aspect-square relative overflow-hidden rounded-lg border">
                      <Image
                        src={previewUrls[index]}
                        alt={image.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <p className="mt-1 text-sm text-gray-600 truncate">
                      {image.name}
                    </p>
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => handleRemoveImage(index)}
                      disabled={isLoading}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex gap-3">
            
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading || (!innitialdata && images.length === 0)}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {innitialdata ? "Updating Product..." : "Creating Product..."}
                </>
              ) : innitialdata ? (
                "Update Product"
              ) : (
                "Create Product"
              )}
            </Button>
            </div>
          </form>
        </Form>
      </div>
    );
  }
);

ProductForm.displayName = "ProductForm";

export default ProductForm;

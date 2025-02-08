"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import axios from "axios";
import toast from "react-hot-toast";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";


import { MainCategoriesType } from "../../categories/component/columns";
import Selector from "./ui/selector";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";


const formSchema = z.object({
  name: z.string().min(2, {
    message: "Categoryname must be at least 2 characters.",
  }),
});

type typeshortform = z.infer<typeof formSchema>;

interface SubcategoryFormprops {
  data: MainCategoriesType[];
}

const SubcategoryForm: React.FC<SubcategoryFormprops> = ({ data }) => {
  const categoryId = useSelector((state: RootState) => state.subcategory?.id)
  const params = useParams();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  async function onSubmit(value: typeshortform) {
    try {
      if(categoryId === null){
        return null;
      }
      await axios.post(
        `/api/${params.storeId}/subcategory`, {
            categoryId: categoryId,
            name: value.name,
        }
      );
      toast.success("Create success");
      window.location.assign(`/${params.storeId}/subcategories`);
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  }

  return (
    <div className="w-96 gap-x-4 flex">
      <Selector categories={data} />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 w-full"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">
                  Subcategory name
                </FormLabel>
                {/* <FormDescription>
                  Your category_Name
                </FormDescription> */}
                <FormControl>
                  <Input placeholder="Type here..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="ml-40">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SubcategoryForm;

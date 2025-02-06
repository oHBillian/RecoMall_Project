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
import { useState } from "react";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Categoryname must be at least 2 characters.",
  }),
});

type typeshortform = z.infer<typeof formSchema>;

const CategoryForm = () => {
  const [loading,setLoading] = useState(false)
  const params = useParams();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  async function onSubmit(value: typeshortform){
    try {
      setLoading(true)
      const respone = await axios.post(`/api/${params.storeId}/categories`,value)
      toast.success("Create success")
      window.location.assign(`/${params.storeId}/categories`)
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error)
    }finally {
      setLoading(false)
    }
  }
  return (
    <div className="w-64">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">Category name</FormLabel>
                {/* <FormDescription>
                  Your category_Name
                </FormDescription> */}
                <FormControl>
                  <Input placeholder="Type here..."{...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="ml-auto" disabled={loading}>
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CategoryForm;

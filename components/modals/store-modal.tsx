import React, { useState } from "react";
import Modal from "../ui/modal";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { onClose } from "@/lib/slices/isOpenSlice";
import axios from 'axios';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Storename must be at least 2 characters.",
  }),
});

const StoreModal = () => {
  const isOpen = useSelector((state: RootState) => state.isOpen.value);
  const [isloading,setIsloading] = useState(false);
  const dispatch = useDispatch();
  const routes = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

 const onSubmit =  async (values: z.infer<typeof formSchema>) => {
    try {
      setIsloading(true)
      const respone = await axios.post("/api/stores", values)
      toast.success("Create success")
      window.location.assign(`/${respone.data.id}`)
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsloading(false)
    }
  }
  return (
    <>
      <Modal
        title="Create Store"
        isopen={isOpen}
        description="Get started by creating your store"
        onClose={() => {dispatch(onClose())}}
      >
        {" "}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Store name</FormLabel>
                    <FormControl>
                      <Input placeholder="E-commerce" {...field} />
                    </FormControl>
                    <FormDescription>
                      
                    </FormDescription>
                    <FormMessage className="text-red-600" />
                  </FormItem>
                )}
              />
              <div className="pt-6 space-x-2 flex items-cent    er justify-end w-full">
                <Button variant="outline" onClick={() => dispatch(onClose())} disabled={isloading}>
                  Cancel
                </Button>
                <Button variant="outline" className="bg-black text-white" type="submit" disabled={isloading}>Continue</Button>
              </div>
            </form>
          </Form>
      </Modal>
    </>
  );
};

export default StoreModal;

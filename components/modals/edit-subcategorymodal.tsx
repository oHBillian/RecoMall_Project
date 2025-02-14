import React, { memo, useEffect } from "react";
import Modal from "../ui/modal";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import Selector from "@/app/(dashboard)/[storeId]/subcategories/component/ui/selector";

interface AlertModalprops {
  onConfirm: (value: string) => void;
  onClose: () => void;
  isOpen: boolean;
  title: string;
  description: string;
  oldName: string;
  isLoading: boolean;
  selectedId?: string;
}

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Categoryname must be at least 2 characters.",
  }),
});

type typeshortform = z.infer<typeof formSchema>;

const EditSubcategoryModal: React.FC<AlertModalprops> = memo((props) => {
  const {
    oldName,
    onConfirm,
    onClose,
    isOpen,
    title,
    description,
    isLoading,
    selectedId,
  } = props;
  const data = useSelector((state: RootState) => state.categories.categories);
  const form = useForm<typeshortform>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  useEffect(() => {
    if (oldName) {
      form.reset({ name: oldName });
    }
  }, [oldName, form.reset]);

  return (
    <>
      <Modal
        isopen={isOpen}
        onClose={onClose}
        title={title}
        description={description}
      >
        <div className="flex flex-col gap-y-3">
          <Selector categories={data} defaultSelected={Number(selectedId)} />
          {/* <SelectorEdit data={data2} defaultSelected={Number(selectedId)}/> */}
          <p className="font-semibold">Subcategory Name</p>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit((value) => {
                onConfirm(value.name);
              })}
              className="space-y-4 w-full"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    {/* <FormDescription>
                  Your category_Name
                </FormDescription> */}
                    <FormControl>
                      <Input
                         placeholder={`Previous Name : ${oldName}`}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />{" "}
              <div className="flex justify-end gap-x-2">
                <Button
                  variant={"default"}
                  className="ml-auto"
                  disabled={isLoading}
                  onClick={onClose}
                >
                  Cancle
                </Button>
                <Button type="submit" className="" disabled={isLoading}>
                  Submit
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </Modal>
    </>
  );
});

EditSubcategoryModal.displayName = "EditSubcategoryModal";
export default EditSubcategoryModal;

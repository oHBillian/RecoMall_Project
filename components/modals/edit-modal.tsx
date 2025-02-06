import React from "react";
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
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useParams } from "next/navigation";
import { useState } from "react";

interface AlertModalprops {
  onConfirm: (value: string) => void;
  onClose: () => void;
  isOpen: boolean;
  title: string;
  description: string;
  oldName: string;
}

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Categoryname must be at least 2 characters.",
  }),
});

type typeshortform = z.infer<typeof formSchema>;

const Editmodal: React.FC<AlertModalprops> = ({
  oldName,
  onConfirm,
  onClose,
  isOpen,
  title,
  description,
}) => {
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const form = useForm<typeshortform>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });
  return (
    <>
      <Modal
        isopen={isOpen}
        onClose={onClose}
        title={title}
        description={description}
      >
          <div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit((value) => {onConfirm(value.name)})}
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
                        <Input placeholder={`Previous Name : ${oldName}`} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {" "}
                <div className="w-full flex pl-72">
                <Button variant={"default"} className="ml-auto" onClick={onClose}>
                  Cancle
                </Button>
                <Button type="submit" className="ml-auto" disabled={loading}>
                  Submit
                </Button>
                </div>
              </form>
            </Form>
          </div>
      </Modal>
    </>
  );
};

export default Editmodal;

import React, { useState } from "react";
import { MainCategoriesType } from "./columns";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import AlertModal from "@/components/modals/alert-modal";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Editmodal from "@/components/modals/edit-categorymodal";

interface CellActionprops {
  data: MainCategoriesType;
}
const CellAction: React.FC<CellActionprops> = ({ data }) => {
  const params = useParams();
  const router = useRouter();
  const [alertopen, setAlertopen] = useState(false);
  const [editopen, setEditopen] = useState(false);
  const [loading,setLoading] = useState(false)
  const [selectedItem, setSelectedItem] = useState<{
    id: number | null;
    name: string | null;
  }>({
    id: null,
    name: null,
  });

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success("Category Id copied to the clipboard.");
  };

  const onAlertConfirm = async () => {
    try {
      if (selectedItem.id === null) return;
      setLoading(true)
      await axios.delete(`/api/${params.storeId}/categories`, {
        data: { deleteId: selectedItem.id },
      });
      toast.success("ลบสำเร็จ");
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false)
      setAlertopen(false);
      setSelectedItem({ id: null, name: null });
      router.refresh();
    }
  };

  const onEditConfirm = async (value : string) => {
    try {
      if (selectedItem.id === null) return;
      setLoading(true)
      await axios.patch(`/api/${params.storeId}/categories`, {
          UpdateId: selectedItem.id,
          name: value 
      });
      // ใช้ windwow.location เพราะปญหาตรง from
      toast.success("อัพเดทสำเร็จ");
      window.location.assign(`/${params.storeId}/categories`)
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false)
      setEditopen(false);
      setSelectedItem({ id: null, name: null });
    }
  };

  return (
    <div>
      <AlertModal
        title={`Are you sure to delete : ${selectedItem.name}`}
        description="'this action cant be'"
        onConfirm={onAlertConfirm}
        onClose={() => setAlertopen(false)}
        isOpen={alertopen}
        isLoading={loading}
      />
      {/* <Editmodal
        oldName={`${selectedItem.name}`}
        title={`Are you sure to Edit : ${selectedItem.name}`}
        description="'this action cant be'"
        onConfirm={(value) => onEditConfirm(value)}
        onClose={() => setEditopen(false)}
        isOpen={editopen}
        isLoading={loading}
      /> */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-9 w-6 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-white">
          <DropdownMenuLabel>Actios</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => onCopy(data.id.toString())}>
            <Copy className="mr-2 h-4 w-4" />
            Copy Id
          </DropdownMenuItem>
          <DropdownMenuItem
             onClick={() => router.push(`/${params.storeId}/products/${data.id}`)
             // setSelectedItem({ id: data.id, name: data.name });
             // setAlertopen(true);
           }
          >
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => router.push(`/${params.storeId}/products/${data.id}`)
              // setSelectedItem({ id: data.id, name: data.name });
              // setAlertopen(true);
            }
          >
            <Trash className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default CellAction;

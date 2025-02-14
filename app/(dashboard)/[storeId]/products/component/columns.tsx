"use client"
 
import { ColumnDef } from "@tanstack/react-table"
import CellAction from "./cell-action";
 
export type PruductType = {
  id: string;
  name: string;
  description: string;
  price: string;
  isFeatured: boolean;
  categoryName: string;
}
 
export const columns: ColumnDef<PruductType>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "categoryName",
    header: "CategoryName",
  },
  {
    accessorKey: "isFeatured",
    header: "IsFeatured",
  },
  {
    accessorKey: "action",
    cell: ({row}) => <CellAction data={row.original} />
  },
]
"use client"
 
import { ColumnDef } from "@tanstack/react-table"
import CellAction from "./cell-action";
 
export type MainCategoriesType = {
  id: number;
  name: string;
  storeId: string;
  createdAt: string;
}
 
export const columns: ColumnDef<MainCategoriesType>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) =>
      new Date(row.original.createdAt).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
  },  
  {
    accessorKey: "action",
    cell: ({row}) => <CellAction data={row.original} />
  },
]
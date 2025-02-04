"use client"
 
import { ColumnDef } from "@tanstack/react-table"
 
export type SubCategoriesType = {
  id: number; 
  name: string; 
  categoryId: number 
}
 
export const columns: ColumnDef<SubCategoriesType>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "action",
    header: "Action",
  },
]
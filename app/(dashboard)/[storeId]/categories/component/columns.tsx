"use client"
 
import { ColumnDef } from "@tanstack/react-table"
 
export type MainCategoriesType = {
  id: number;
  name: string;
  storeId: string;
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
    accessorKey: "action",
    header: "Action",
  },
]
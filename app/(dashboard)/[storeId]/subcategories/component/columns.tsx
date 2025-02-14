"use client"
 
import { ColumnDef } from "@tanstack/react-table"
import CellAction from "./cell-action";
 
export type SubCategoriesType = {
  id: number; 
  name: string; 
  categoryName: string;
  categoriesId? : number;
}
 
export const columns: ColumnDef<SubCategoriesType>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "name",
    header: "SubCategoryName",
  },
  {
    accessorKey: "categoryName",
    header: "Category",
  },
  {
    accessorKey: "action",
    cell: ({row}) => <CellAction data={row.original} />
  },
]
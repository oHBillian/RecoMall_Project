"use client"
 
import { ColumnDef } from "@tanstack/react-table"
import CellAction from "./cell-action";
 
export type PruductType = {
  id: number;
  name: string;
  storeId: string;
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
    accessorKey: "action",
    cell: ({row}) => <CellAction data={row.original} />
  },
]
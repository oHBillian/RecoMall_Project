import React from 'react'
import { columns, MainCategoriesType } from './columns'
import { DataTable } from '@/components/ui/data-table'
interface CategoryClientprops {
    data: MainCategoriesType[]
}

const CategoryClient:React.FC<CategoryClientprops> = ({data}) => {
  return (
    <div className="container mx-auto py-4">
    <DataTable searchkey={'name'} columns={columns} data={data} />
  </div>
  )
}

export default CategoryClient
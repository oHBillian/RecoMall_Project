import React from 'react'
import { columns, PruductType } from './columns'
import { DataTable } from '@/components/ui/data-table'
interface ProductClientprops {
    data: PruductType[]
}

const ProductClient:React.FC<ProductClientprops> = ({data}) => {


  return (
    <div className="container mx-auto py-4">
    <DataTable searchkey={'name'} columns={columns} data={data} />
  </div>
  )
}

export default ProductClient
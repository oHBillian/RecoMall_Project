import React from 'react'
import { columns, PruductType } from './columns'
import { DataTable } from '@/components/ui/data-table'
interface ProductClientprops {
    data: PruductType[]
}

const CategoryClient:React.FC<ProductClientprops> = ({data}) => {
  
  const sortedData = React.useMemo(() => {
    return [...data].sort((a, b) => a.id - b.id);
  }, [data]);

  return (
    <div className="container mx-auto py-4">
    <DataTable searchkey={'name'} columns={columns} data={sortedData} />
  </div>
  )
}

export default CategoryClient
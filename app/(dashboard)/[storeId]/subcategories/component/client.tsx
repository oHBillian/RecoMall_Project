"use client"
import React, { useDebugValue, useEffect } from 'react'
import { columns, SubCategoriesType } from './columns'
import { DataTable } from '@/components/ui/data-table'
import { MainCategoriesType } from '../../categories/component/columns';
import { useDispatch } from 'react-redux';
import { setCategories } from '@/lib/slices/categoriesReducer';
interface CategoryClientprops {
    data: SubCategoriesType[];
    data2: MainCategoriesType[];
}

const SubcategoryClient:React.FC<CategoryClientprops> = ({data,data2}) => {

  const dispatch = useDispatch()

  const sortedData = React.useMemo(() => {
    return [...data].sort((a, b) => a.id - b.id);
  }, [data]);

  useEffect(() => {
    dispatch(setCategories(data2))
  }, [dispatch,data2])
  
  return (
    <div className="container mx-auto py-4">
    <DataTable searchkey={'categoryName'} columns={columns} data={sortedData} />
  </div>
  )
}

export default SubcategoryClient
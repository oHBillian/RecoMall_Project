"use client"
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import React from 'react'

const CreateProductUi = () => {
    const params = useParams();
    const router = useRouter();
    const onclickl = () => {
      router.push(`/${params.storeId}/products/new`)
    }
  return (
    <div className="flex justify-between items-center">
    <div>
      <span className="font-semibold text-2xl">Create Products</span>
      <div className="mt-2">Create a Product description</div>
    </div>
    <div>
      <Button onClick={onclickl}><Plus />Add New</Button>
    </div>
  </div>
  )
}

export default CreateProductUi
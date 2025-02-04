import prismadb from '@/lib/prismadb'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation';
import React from 'react'


const overviewPage = async () => {
  const {userId} = await auth();
  if(!userId){
    redirect("/sign-in")
  }
  const store = await prismadb.store.findFirst({
    where: {
      userId
    }
  })

  return (
    <div className='font-semibold text-2xl'>StoreName : {store?.name}</div>
  )
}

export default overviewPage
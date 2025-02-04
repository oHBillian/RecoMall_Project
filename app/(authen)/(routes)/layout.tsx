import React from 'react'

export default function layout({children} : {children : React.ReactNode}){
  return (
    <div className='flex justify-center items-center h-full'>{children}</div>
  )
}


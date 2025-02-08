import React, { useEffect, useState } from 'react'
import Modal from '../ui/modal';
import { Button } from '../ui/button';


interface AlertModalprops {
    onConfirm : () => void;
    onClose : () => void;
    isOpen: boolean;
    title: string;
    description: string;
    isLoading: boolean;
}
const AlertModal:React.FC<AlertModalprops> = ({onConfirm,onClose,isOpen,title,description,isLoading}) => {
  return (
    <>
    <Modal isopen={isOpen} onClose={onClose} title={title} description={description}>
      <div className='flex justify-end gap-x-2'>
      <Button variant={'default'} disabled={isLoading} onClick={onClose}>Cancle</Button>
      <Button variant={'outline'} disabled={isLoading} onClick={onConfirm}>Continous</Button>
      </div>
        
    </Modal>
    </>
  )
}

export default AlertModal
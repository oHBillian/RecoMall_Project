"use client"
import { onOpen } from "@/lib/slices/isOpenSlice";
import { RootState } from "@/lib/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const SetupPage = () => {
  const open = useSelector((state: RootState) => state.isOpen.value);
  const dispatch = useDispatch()
  useEffect(() => {
    if(!open){
      dispatch(onOpen())
    }
  }, [open,dispatch]);

  return null;
};

export default SetupPage;

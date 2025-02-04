import { configureStore } from "@reduxjs/toolkit";
import isOpenSlice from "./slices/isOpenSlice"; 
export const store = configureStore({
  reducer: {
    isOpen: isOpenSlice, 
  },
});

// ประกาศ RootState และ AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
import { configureStore } from "@reduxjs/toolkit";
import isOpenSlice from "./slices/isOpenSlice"; 
import SelectorValue from "./slices/subCategoryValue";
import categoriesReducer from "./slices/categoriesReducer";
export const store = configureStore({
  reducer: {
    isOpen: isOpenSlice, 
    selectorValue: SelectorValue,
    categories: categoriesReducer,
  },
});

// ประกาศ RootState และ AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
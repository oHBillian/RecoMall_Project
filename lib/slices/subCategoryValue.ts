import { createSlice, PayloadAction} from "@reduxjs/toolkit";

interface SelectorValue {
  categoryId: number | null;
  subcategoryId: number | null;
  name: string;
}

const initialState: SelectorValue = { categoryId: null,subcategoryId: null,name: ""};

const SelectorValue = createSlice({
  name: "Alertvalue",
  initialState,
  reducers: {
    setIdCategory: (state, action: PayloadAction<number | null>) => {
      state.categoryId = action.payload;
    },
    setIdSubCategory: (state, action: PayloadAction<number | null>) => {
      state.subcategoryId = action.payload;
    },
    setName: (state,action: PayloadAction<string>) => {
      state.name = action.payload;
    }
  },
});

export const { setIdCategory,setName,setIdSubCategory } = SelectorValue.actions;
export default SelectorValue.reducer;
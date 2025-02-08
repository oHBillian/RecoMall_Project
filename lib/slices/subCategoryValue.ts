import { createSlice, PayloadAction} from "@reduxjs/toolkit";

interface subCategoryValue {
  id: number | null;
  name: string;
}

const initialState: subCategoryValue = { id: null,name: ""};

const subCategoryValue = createSlice({
  name: "Alertvalue",
  initialState,
  reducers: {
    setIdCategory: (state, action: PayloadAction<number | null>) => {
      state.id = action.payload;
    },
    setName: (state,action: PayloadAction<string>) => {
      state.name = action.payload;
    }
  },
});

export const { setIdCategory,setName } = subCategoryValue.actions;
export default subCategoryValue.reducer;
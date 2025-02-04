import { createSlice} from "@reduxjs/toolkit";

interface IsOpenState {
  value: boolean;
}

const initialState: IsOpenState = { value: false };

const isOpenSlice = createSlice({
  name: "isOpen",
  initialState,
  reducers: {
    onOpen : (state) => {
      state.value = true;
    },
    onClose : (state) => {
      state.value = false
    }
  },
});

export const { onOpen,onClose } = isOpenSlice.actions;
export default isOpenSlice.reducer;
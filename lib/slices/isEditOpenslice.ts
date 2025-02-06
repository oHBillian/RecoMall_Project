// import { createSlice, PayloadAction} from "@reduxjs/toolkit";

// interface IsOpenState {
//   id: number | null;
//   name: string;
// }

// const initialState: IsOpenState = { id: null,name: ""};

// const isEditOpenslice = createSlice({
//   name: "EditValue",
//   initialState,
//   reducers: {
//     setEditId: (state, action: PayloadAction<number | null>) => {
//       state.id = action.payload;
//     },
//     setEditName: (state,action: PayloadAction<string>) => {
//       state.name = action.payload;
//     }
//   },
// });

// export const { setEditId,setEditName } = isEditOpenslice.actions;
// export default isEditOpenslice.reducer;
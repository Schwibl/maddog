import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: 'excel',
};

export const estimateSlice = createSlice({
  name: 'fileType',
  initialState,
  reducers: {
    // methods, that change state of estimate's type
    exampleAction: (state) => {},
  },
});
export const { exampleAction } = estimateSlice.actions;

export default estimateSlice.reducer;
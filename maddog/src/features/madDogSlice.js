import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: 'excel',
}

export const estimateSlice = createSlice({
  name: 'fileType',
  initialState,
  reducers: {
    // methods, that change state of estimate's type
  },
})
export const {  } = estimateSlice.actions

export default estimateSlice.reducer
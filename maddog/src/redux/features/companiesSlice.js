import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  companies: [],
};

const companiesSlice = createSlice({
  name: 'companies',
  initialState,
  reducers: {
    fillCompanies: (state, action) => {
      state.companies = action.payload;
    },
  },
});

export const { fillCompanies } = companiesSlice.actions;
export default companiesSlice.reducer;

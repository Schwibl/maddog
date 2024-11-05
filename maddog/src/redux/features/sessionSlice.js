import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: null,
  username: '',
  fullName: '',
  phoneNumber: '',
  roles: '',
  active: false,
};

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    updateSession: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { updateSession } = sessionSlice.actions;
export default sessionSlice.reducer;

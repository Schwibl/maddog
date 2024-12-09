import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  usersList: [],
  selectedUser: null,
  roles: [],
  colors: [],
  listPage: {
    page: 0,
    size: 20,
    totalPages: 0
  }
};

const AdminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setUsersList: (state, action) => {
      state.usersList = action.payload;
    },
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    setRoles: (state, action) => {
      state.roles = action.payload;
    },
    setColors: (state, action) => {
      state.colors = action.payload;
    },
    setListPage: (state, action) => {
      state.listPage = action.payload;
    },
    setTotalPages: (state, action) => {
      state.listPage.totalPages = action.payload;
    },
    clearSelectedUser: (state) => {
      state.selectedUser = null;
    }
  }
});

export const {
  setUsersList,
  setSelectedUser,
  setRoles,
  setColors,
  setListPage,
  setTotalPages,
  clearSelectedUser
} = AdminSlice.actions;

export default AdminSlice.reducer; 
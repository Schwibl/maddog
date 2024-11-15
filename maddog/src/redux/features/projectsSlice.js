import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  projectsList: [],
  selectedProject: null,
  listPage: {
    page: 0,
    size: 20,
    totalPages: 0
  }
};

const ProjectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setProjectsList: (state, action) => {
      state.projectsList = action.payload;
    },
    setSelectedProject: (state, action) => {
      state.selectedProject = action.payload;
    },
    setListPage: (state, action) => {
      state.listPage = action.payload;
    },
    setTotalPages: (state, action) => {
      state.listPage.totalPages = action.payload;
    }
  }
});

export const {
  setProjectsList,
  setSelectedProject,
  setListPage,
  setTotalPages
} = ProjectsSlice.actions;

export const ProjectsReducer = ProjectsSlice.reducer;

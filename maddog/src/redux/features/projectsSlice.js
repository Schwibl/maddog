import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  projectsList: [],
  selectedProject: null,
  projectsTypesList: [],
  projectsStatusesList: [],
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
    setProjectsTypesList: (state, action) => {
      state.projectsTypesList = action.payload;
    },
    setProjectsStatusesList: (state, action) => {
      state.projectsStatusesList = action.payload;
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
  setTotalPages,
  setProjectsTypesList,
  setProjectsStatusesList
} = ProjectsSlice.actions;

export const ProjectsReducer = ProjectsSlice.reducer;

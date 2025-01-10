import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  projectsList: [],
  selectedProject: null,
  projectsTypesList: [],
  projectsStatusesList: [],
  leaseTypesList: [],
  selectedEquipment: [],
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
    getProjectById: (state, action) => {
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
    },
    setSelectedEquipment: (state, action) => {
      state.selectedEquipment = action.payload;
    },
    addSelectedEquipment: (state, action) => {
      if (!state.selectedEquipment.some(eq => eq.id === action.payload.id)) {
        state.selectedEquipment.push(action.payload);
      }
    },
    removeSelectedEquipment: (state, action) => {
      state.selectedEquipment = state.selectedEquipment.filter(eq => eq.id !== action.payload.id);
    },
    clearSelectedEquipment: (state) => {
      state.selectedEquipment = [];
    },
    setLeaseTypesList: (state, action) => {
      state.leaseTypesList = action.payload;
    },
    clearLeaseTypesList: (state) => {
      state.leaseTypesList = [];
    },
  }
});

export const {
  setProjectsList,
  setSelectedProject,
  setListPage,
  setTotalPages,
  setProjectsTypesList,
  setProjectsStatusesList,
  setSelectedEquipment,
  addSelectedEquipment,
  removeSelectedEquipment,
  clearSelectedEquipment,
  setLeaseTypesList,
  clearLeaseTypesList
} = ProjectsSlice.actions;

export const ProjectsReducer = ProjectsSlice.reducer;

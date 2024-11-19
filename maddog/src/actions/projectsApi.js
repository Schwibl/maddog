import { createAsyncThunk } from '@reduxjs/toolkit';
import fetchWithAuth from '../middleware/restMiddleware';
import { checkRequest } from './utils';
import { 
  setProjectsList,
  setSelectedProject,
  setTotalPages
} from '../redux/features/projectsSlice';

const BASE_URL = 'http://62.113.113.183:8963/api/v1/';

export const getAllProjects = createAsyncThunk(
  'projects/getAllProjects',
  async (filterObject, thunkAPI) => {
    try {
      const { page, size } = thunkAPI.getState().projects.listPage;
      const response = await fetchWithAuth(`${BASE_URL}projects/filter?page=${page}&size=${size}`, {
        method: 'POST',
        body: JSON.stringify(filterObject || {}),
      });
      const data = await checkRequest(response);
      thunkAPI.dispatch(setProjectsList(data.content));
      thunkAPI.dispatch(setTotalPages(data.totalPages));
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getProjectById = createAsyncThunk(
  'projects/getProjectById',
  async ({id}, thunkAPI) => {
    try {
      const response = await fetchWithAuth(`${BASE_URL}projects/${id}`, {
        method: 'GET',
      });
      const data = await checkRequest(response);
      thunkAPI.dispatch(setSelectedProject(data));
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateProjectById = createAsyncThunk(
  'projects/updateProjectById',
  async ({id, ...updateData}, thunkAPI) => {
    try {
      const response = await fetchWithAuth(`${BASE_URL}projects/${id}`, {
        method: 'PUT',
        body: JSON.stringify(updateData),
      });
      await checkRequest(response);
      const { page, size } = thunkAPI.getState().projects.listPage;
      thunkAPI.dispatch(getAllProjects({ page, size }));
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const createProject = createAsyncThunk(
  'projects/createProject',
  async (projectData, thunkAPI) => {
    try {
      const response = await fetchWithAuth(`${BASE_URL}projects`, {
        method: 'POST',
        body: JSON.stringify(projectData),
      });
      await checkRequest(response);
      const { page, size } = thunkAPI.getState().projects.listPage;
      thunkAPI.dispatch(getAllProjects({ page, size }));
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteProjectById = createAsyncThunk(
  'projects/deleteProjectById',
  async ({id}, thunkAPI) => {
    try {
      const response = await fetchWithAuth(`${BASE_URL}projects/${id}`, {
        method: 'DELETE',
      });
      // await checkRequest(response);
      const { page, size } = thunkAPI.getState().projects.listPage;
      thunkAPI.dispatch(getAllProjects({ page, size }));
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

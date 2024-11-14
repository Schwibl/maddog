import { createAsyncThunk } from '@reduxjs/toolkit';
import fetchWithAuth from '../middleware/restMiddleware';
import { checkRequest } from './utils';
import { 
  setEquipmentList, 
  setSelectedEquipment,
  setStatusesList,
  setEstimateSections,
  setTotalPages,
  setEquipmentTypes
} from '../redux/features/equipmentSlice';

const BASE_URL = 'http://62.113.113.183:8963/api/v1/';

export const getEquipmentById = createAsyncThunk(
  'equipment/getEquipmentById',
  async ({id}, thunkAPI) => {
    try {
      const response = await fetchWithAuth(`${BASE_URL}tools/${id}`, {
        method: 'GET',
      });
      const data = await checkRequest(response);
      thunkAPI.dispatch(setSelectedEquipment(data));
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateEquipmentOrStatusById = createAsyncThunk(
  'equipment/updateEquipmentOrStatusById',
  async ({id, ...updateData}, thunkAPI) => {
    try {
      const response = await fetchWithAuth(`${BASE_URL}tools/${id}`, {
        method: 'PUT',
        body: JSON.stringify(updateData),
      });
      await checkRequest(response);
      const { page, size } = thunkAPI.getState().equipment.listPage;
      thunkAPI.dispatch(getAllEquipment({ page, size }));
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteEquipment = createAsyncThunk(
  'equipment/deleteEquipment',
  async ({id}, thunkAPI) => {
    try {
      const response = await fetchWithAuth(`${BASE_URL}tools/${id}`, {
        method: 'DELETE',
      });
      await checkRequest(response);
      const { page, size } = thunkAPI.getState().equipment.listPage;
      thunkAPI.dispatch(getAllEquipment({ page, size }));
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getAllEquipment = createAsyncThunk(
  'equipment/getAllEquipment',
  async (_, thunkAPI) => {
    try {
      const { page, size } = thunkAPI.getState().equipment.listPage;
      const response = await fetchWithAuth(`${BASE_URL}tools?page=${page}&size=${size}`, {
        method: 'GET',
      });
      const data = await checkRequest(response);
      thunkAPI.dispatch(setEquipmentList(data.content));
      thunkAPI.dispatch(setTotalPages(data.totalPages));
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const createNewEquipment = createAsyncThunk(
  'equipment/createNewEquipment',
  async ({ newEquipmentData }, thunkAPI) => {
    try {
      const response = await fetchWithAuth(`${BASE_URL}tools`, {
        method: 'POST',
        body: JSON.stringify(newEquipmentData),
      });
      await checkRequest(response);
      const { page, size } = thunkAPI.getState().equipment.listPage;
      thunkAPI.dispatch(getAllEquipment({ page, size }));
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getEquipmentWithFilter = createAsyncThunk(
  'equipment/getEquipmentWithFilter',
  async ({ activeFilters, page, size }, thunkAPI) => {
    try {
      const response = await fetchWithAuth(`${BASE_URL}tools/filter?page=${page}&size=${size}`, {
        method: 'POST',
        body: JSON.stringify({ ...activeFilters }),
      });
      const data = await checkRequest(response);
      thunkAPI.dispatch(setEquipmentList(data.content));
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getAllTypesOfStatuses = createAsyncThunk(
  'equipment/getAllTypesOfStatuses',
  async (_, thunkAPI) => {
    try {
      const response = await fetchWithAuth(`${BASE_URL}tools/statuses_types`, {
        method: 'GET',
      });
      const data = await checkRequest(response);
      thunkAPI.dispatch(setStatusesList(data));
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getAllEstimateSections = createAsyncThunk(
  'equipment/getAllEstimateSections',
  async (_, thunkAPI) => {
    try {
      const response = await fetchWithAuth(`${BASE_URL}tools/statuses_types`, {
        method: 'GET',
      });
      const data = await checkRequest(response);
      thunkAPI.dispatch(setEstimateSections(data));
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getAllEquipmentTypes = createAsyncThunk(
  'equipment/getAllEquipmentTypes',
  async (_, thunkAPI) => {
    try {
      const response = await fetchWithAuth(`${BASE_URL}category`, {
        method: 'GET',
      });
      const data = await checkRequest(response);
      console.log(data);
      thunkAPI.dispatch(setEquipmentTypes(data));
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

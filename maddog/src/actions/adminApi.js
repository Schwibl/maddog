import { createAsyncThunk } from '@reduxjs/toolkit';
import fetchWithAuth from '../middleware/restMiddleware';
import { checkRequest } from './utils';
import {
  setUsersList,
  setSelectedUser,
  setTotalPages,
  setRoles,
  setColors
} from '../redux/features/adminSlice';

const BASE_URL = 'http://62.113.113.183:8963/api/v1/admin/users';

export const getOneUser = createAsyncThunk(
  'admin/getOneUser',
  async (id, thunkAPI) => {
    try {
      const response = await fetchWithAuth(`${BASE_URL}/${id}`, {
        method: 'GET',
      });
      const data = await checkRequest(response);
      thunkAPI.dispatch(setSelectedUser(data));
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getManyUsers = createAsyncThunk(
  'admin/getManyUsers',
  async (_, thunkAPI) => {
    try {
      const { page, size } = thunkAPI.getState().admin.listPage;
      const response = await fetchWithAuth(`${BASE_URL}?page=${page}&size=${size}`, {
        method: 'GET',
      });
      const data = await checkRequest(response);
      thunkAPI.dispatch(setUsersList(data.content));
      thunkAPI.dispatch(setTotalPages(data.totalPages));
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const createUser = createAsyncThunk(
  'admin/createUser',
  async (userData, thunkAPI) => {
    try {
      const response = await fetchWithAuth(BASE_URL, {
        method: 'POST',
        body: JSON.stringify(userData),
      });
      await checkRequest(response);
      thunkAPI.dispatch(getManyUsers());
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateUser = createAsyncThunk(
  'admin/updateUser',
  async ({id, ...userData}, thunkAPI) => {
    try {
      const response = await fetchWithAuth(`${BASE_URL}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(userData),
      });
      await checkRequest(response);
      thunkAPI.dispatch(getManyUsers());
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteUser = createAsyncThunk(
  'admin/deleteUser',
  async (id, thunkAPI) => {
    try {
      await fetchWithAuth(`${BASE_URL}/${id}`, {
        method: 'DELETE',
      });
      thunkAPI.dispatch(getManyUsers());
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getUsersRoles = createAsyncThunk(
  'admin/getUsersRoles',
  async (_, thunkAPI) => {
    try {
      const response = await fetchWithAuth(`${BASE_URL}/roles`, {
        method: 'GET',
      });
      const data = await checkRequest(response);
      thunkAPI.dispatch(setRoles(data));
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getUsersColors = createAsyncThunk(
  'admin/getUsersColors',
  async (_, thunkAPI) => {
    try {
      const response = await fetchWithAuth(`${BASE_URL}/colors`, {
        method: 'GET',
      });
      const data = await checkRequest(response);
      thunkAPI.dispatch(setColors(data));
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
); 
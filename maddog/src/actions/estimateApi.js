import { createAsyncThunk } from '@reduxjs/toolkit';
import fetchWithAuth from '../middleware/restMiddleware';
import { checkRequest } from './utils';
import { setCurrentEstimate } from '../redux/features/estimateSlice';

const BASE_URL = 'http://62.113.113.183:8963/api/v1/';

export const getEstimateById = createAsyncThunk(
  'estimate/getEstimateById',
  async ({id}, thunkAPI) => {
    try {
      const response = await fetchWithAuth(`${BASE_URL}estimate/${id}`, {
        method: 'GET',
      });
      const data = await checkRequest(response);
      thunkAPI.dispatch(setCurrentEstimate(data));
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
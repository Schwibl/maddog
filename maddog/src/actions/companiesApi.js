import { createAsyncThunk } from '@reduxjs/toolkit';
import fetchWithAuth from '../middleware/restMiddleware';
import { checkRequest } from './utils';
import { fillCompanies } from '../redux/features/companiesSlice';

const BASE_URL = 'http://62.113.113.183:8963/api/v1/';

export const getCompanies = createAsyncThunk('companies/getCompanies', async (_, thunkAPI) => {
  try {
    const response = await fetchWithAuth(`${BASE_URL}company?page=0&size=10000`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
      },
    });

    const data = await checkRequest(response);

    thunkAPI.dispatch(fillCompanies(data));
    return data;
  } catch (error) {
    console.error('Error fetching companies:', error);
    return { error: error };
  }
});

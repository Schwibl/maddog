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


/**
 * Асинхронный thunk для отправки данных сметы на сервер
 * @param {Object} data - Данные сметы для сохранения
 * @returns {Promise} - Промис с результатом запроса
 */
export const postEstimate = createAsyncThunk(
  'estimate/postEstimate',
  async (data, thunkAPI) => {
    try {
      // Use projectId in the URL path
      const response = await fetchWithAuth(`${BASE_URL}estimate/${data.projectId}`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const checkedResponse = await checkRequest(response);
      // Обновляем текущую смету в Redux store
      thunkAPI.dispatch(setCurrentEstimate(checkedResponse));
      return checkedResponse;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const postNewEstimate = createAsyncThunk(
  'estimate/postNewEstimate',
  async (data, thunkAPI) => {
    try {
      const response = await fetchWithAuth(`${BASE_URL}pattern`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const checkedResponse = await checkRequest(response);
      return checkedResponse;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

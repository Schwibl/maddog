import { createAsyncThunk } from '@reduxjs/toolkit';
import fetchWithAuth from '../middleware/restMiddleware';
import { checkRequest } from './utils';

const BASE_URL = 'http://62.113.113.183:8963/api/v1/';



export const getPattern = createAsyncThunk(
  'pattern/getPattern',
  async (setPattern, thunkAPI) => {
    try {
      const response = await fetchWithAuth(`${BASE_URL}pattern`, {
        method: 'GET',
      });
      const data = await checkRequest(response);
      // example of data
        // {
        //   "id": 0,
        //   "name": "string",
        //   "quantityShifts": "string",
        //   "filmingPeriod": "string",
        //   "operator": "string",
        //   "customer": "string",
        //   "manager": "string",
        //   "phone": "string",
        //   "site": "string",
        //   "sections": [
        //     {
        //       "id": 0,
        //       "name": "string",
        //       "tools": [
        //         {
        //           "id": 0,
        //           "name": "string",
        //           "amount": "string",
        //           "quantity": "string",
        //           "section": 0,
        //           "services": [
        //             {
        //               "id": 0,
        //               "name": "string",
        //               "amount": "string",
        //               "quantity": "string",
        //               "tool": 0
        //             }
        //           ]
        //         }
        //       ]
        //     }
        //   ]
        // }
      setPattern(data);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const postToCreateProjectWithPattern = createAsyncThunk(
  'pattern/postToCreateProjectWithPattern',
  async (project, thunkAPI) => {
    // example of project
      // {
      //   "name": "string",
      //   "quantityShifts": "string",
      //   "filmingPeriod": "string",
      //   "operator": "string",
      //   "customer": "string",
      //   "manager": "string",
      //   "phone": "string",
      //   "site": "string",
      //   "sections": [
      //     {
      //       "name": "string",
      //       "tools": [
      //         {
      //           "name": "string",
      //           "amount": "string",
      //           "quantity": "string",
      //           "sectionId": 0,
      //           "services": [
      //             {
      //               "name": "string",
      //               "amount": "string",
      //               "quantity": "string",
      //               "tool": 0
      //             }
      //           ]
      //         }
      //       ]
      //     }
      //   ]
      // }
    try {
      const response = await fetchWithAuth(`${BASE_URL}pattern`, {
        method: 'POST',
        body: JSON.stringify(project),
      });
      const data = await checkRequest(response);
      // example of data
        // {
        //   "id": 0,
        //   "name": "string",
        //   "quantityShifts": "string",
        //   "filmingPeriod": "string",
        //   "operator": "string",
        //   "customer": "string",
        //   "manager": "string",
        //   "phone": "string",
        //   "site": "string",
        //   "sections": [
        //     {
        //       "id": 0,
        //       "name": "string",
        //       "tools": [
        //         {
        //           "id": 0,
        //           "name": "string",
        //           "amount": "string",
        //           "quantity": "string",
        //           "section": 0,
        //           "services": [
        //             {
        //               "id": 0,
        //               "name": "string",
        //               "amount": "string",
        //               "quantity": "string",
        //               "tool": 0
        //             }
        //           ]
        //         }
        //       ]
        //     }
        //   ]
        // }
      console.log(data);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const postToAddToolsToPattern = createAsyncThunk(
  'pattern/postToAddToolsToPattern',
  async (tools, thunkAPI) => {
    // example of tools
      // {
      //   "name": "string",
      //   "amount": "string",
      //   "quantity": "string",
      //   "sectionId": 0,
      //   "services": [
      //     {
      //       "name": "string",
      //       "amount": "string",
      //       "quantity": "string",
      //       "tool": 0
      //     }
      //   ]
      // }
    try {
      const response = await fetchWithAuth(`${BASE_URL}pattern/tools`, {
        method: 'POST',
        body: JSON.stringify(tools),
      });
      const data = await checkRequest(response);
      // example of data
        // {
        //   "id": 0,
        //   "name": "string",
        //   "amount": "string",
        //   "quantity": "string",
        //   "section": 0,
        //   "services": [
        //     {
        //       "id": 0,
        //       "name": "string",
        //       "amount": "string",
        //       "quantity": "string",
        //       "tool": 0
        //     }
        //   ]
        // }
      console.log(data);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const postToAddServicesToPattern = createAsyncThunk(
  'pattern/postToAddServicesToPattern',
  async (services, thunkAPI) => {
    // example of services
      // {
      //   "name": "string",
      //   "amount": "string",
      //   "quantity": "string",
      //   "tool": 0
      // }
    try {
      const response = await fetchWithAuth(`${BASE_URL}pattern/service`, {
        method: 'POST',
        body: JSON.stringify(services),
      });
      const data = await checkRequest(response);
      // example of data
        // {
        //   "id": 0,
        //   "name": "string",
        //   "amount": "string",
        //   "quantity": "string",
        //   "tool": 0
        // }
      console.log(data);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const postToAddSectionToPattern = createAsyncThunk(
  'pattern/postToAddSectionToPattern',
  async (section, thunkAPI) => {
    // example of section
      // {
      //   "name": "string",
      //   "tools": [
      //     {
      //       "name": "string",
      //       "amount": "string",
      //       "quantity": "string",
      //       "sectionId": 0,
      //       "services": [
      //         {
      //           "name": "string",
      //           "amount": "string",
      //           "quantity": "string",
      //           "tool": 0
      //         }
      //       ]
      //     }
      //   ]
      // }
    try {
      const response = await fetchWithAuth(`${BASE_URL}pattern/section`, {
        method: 'POST',
        body: JSON.stringify(section),
      });
      const data = await checkRequest(response);
      // example of data
        // {
        //   "id": 0,
        //   "name": "string",
        //   "tools": [
        //     {
        //       "id": 0,
        //       "name": "string",
        //       "amount": "string",
        //       "quantity": "string",
        //       "section": 0,
        //       "services": [
        //         {
        //           "id": 0,
        //           "name": "string",
        //           "amount": "string",
        //           "quantity": "string",
        //           "tool": 0
        //         }
        //       ]
        //     }
        //   ]
        // }
      console.log(data);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteProjectFromPatternById = createAsyncThunk(
  'pattern/deleteProjectFromPatternById',
  async (id, thunkAPI) => {
    try {
      const response = await fetchWithAuth(`${BASE_URL}pattern/${id}`, {
        method: 'DELETE',
      });
      const data = await checkRequest(response);
      console.log(data);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);  

export const deleteToolFromPatternById = createAsyncThunk(
  'pattern/deleteToolFromPatternById',
  async (id, thunkAPI) => {
    try {
      const response = await fetchWithAuth(`${BASE_URL}pattern/tools/${id}`, {
        method: 'DELETE',
      });
      const data = await checkRequest(response);
      console.log(data);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);  

export const deleteServiceFromPatternById = createAsyncThunk(
  'pattern/deleteServiceFromPatternById',
  async (id, thunkAPI) => {
    try {
      const response = await fetchWithAuth(`${BASE_URL}pattern/services/${id}`, {
        method: 'DELETE',
      });
      const data = await checkRequest(response);
      console.log(data);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);  

export const deleteSectionFromPatternById = createAsyncThunk(
  'pattern/deleteSectionFromPatternById',
  async (id, thunkAPI) => {
    try {
      const response = await fetchWithAuth(`${BASE_URL}pattern/section/${id}`, {
        method: 'DELETE',
      });
      const data = await checkRequest(response);
      console.log(data);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);  

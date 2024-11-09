import { createAsyncThunk } from '@reduxjs/toolkit';
import { fillContacts, setPossibleRoles } from '../redux/features/contactsSlice';
import fetchWithAuth from '../middleware/restMiddleware';
import { checkRequest } from './utils';

const BASE_URL = 'http://62.113.113.183:8963/api/v1/';

const body = {
  name: 'string',
  numberPassport: 'string',
  issuedBy: 'string',
  dateIssuePassport: '2024-02-10',
  roleContactId: 0,
  photos: ['string'],
  comment: 'string',
};

export const getAdmins = async () => {
  try {
    const response = await fetch(`${BASE_URL}admin/users?page=1&size=10`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG0iLCJyb2xlcyI6WyJST0xFX0FETUlOIl0sImlzcyI6InRvb2xzLWFjY291bnRpbmctc2VjdXJpdHkiLCJleHAiOjE3MjcxMzEwNjYsImlhdCI6MTcyNzExNjY2NiwianRpIjoiNTlmZWM3Y2QtY2YyMy00MDZlLWFjYTgtYTA4NmU2ZTI0OWQ3In0.TsURdF-KSFuJHlCs83DU49yfyGAh3mXJdslrqT-579I
        `,
      },
    });

    console.log('Response status:', response.status); // статус ответа
    console.log('Response headers:', [...response.headers.entries()]); // заголовки ответа

    if (!response.ok) {
      const errorData = await response.text(); // меняем на text() для вывода тела ошибки
      console.error('Ошибка сервера:', errorData);
      throw new Error(`Server error: ${response.statusText}`);
    }

    return checkRequest(response); // Возвращаем результат, если запрос успешен
  } catch (error) {
    console.error('Ошибка запроса:', error.message);
    throw error; // пробрасываем ошибку для дальнейшей обработки
  }
};

export const getPossibleRoles = createAsyncThunk(
  'contacts/getPossibleRoles',
  async (_, thunkAPI) => {
    try {
      const response = await fetchWithAuth(`${BASE_URL}role_contacts`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json;charset=utf-8',
        },
      });
      const data = await checkRequest(response);
      thunkAPI.dispatch(setPossibleRoles(data));
      return data;
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error fetching possible roles:', error.message);
        return { error: error.message };
      }
      console.error('Error fetching possible roles:', error);
      return { error: error };
    }
  }
);
export const createContactRole = createAsyncThunk('contacts/createContactRole', async ({name}, thunkAPI) => {
  try {
    const response = await fetchWithAuth(`${BASE_URL}role_contacts`, {
      method: 'POST',
      body: JSON.stringify({name, contacts: []}),
    });
    await checkRequest(response);
    thunkAPI.dispatch(getPossibleRoles());
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const getAllContacts = createAsyncThunk('contacts/getAllContacts', async (_, thunkAPI) => {
  try {
    const { page, size } = thunkAPI.getState().contacts;

    const response = await fetchWithAuth(`${BASE_URL}contacts?page=${page}&size=${size}`, {
      method: 'GET',
    });
    const data = await checkRequest(response);
    thunkAPI.dispatch(fillContacts(data.content));
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});
export const getContactById = createAsyncThunk('contacts/getContactById', async ({id, setUser}, thunkAPI) => {
  try {
    const response = await fetchWithAuth(`${BASE_URL}contacts/${id}`,{
      method: 'GET',
    });
    const data = await checkRequest(response);
    console.log('data from getContactById', data);
    console.log('setUser', data);
    setUser(data);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});
export const createContact = createAsyncThunk(
  'contacts/createContact',
  async ({ name, phoneNumber, company, role, comment, photos }, thunkAPI) => {
    try {
      const response = await fetchWithAuth(`${BASE_URL}contacts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          phoneNumber,
          company,
          roleContactId: role,
          photos,
          comment,
        }),
      });
      await checkRequest(response);
      const { page, size } = thunkAPI.getState().contacts;
      thunkAPI.dispatch(getAllContacts({ page, size }));
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const updateContact = createAsyncThunk('contacts/updateContact', async ({id, name, phoneNumber, company, role, comment, photos}, thunkAPI) => {
  try {
    const response = await fetchWithAuth(`${BASE_URL}contacts/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        name,
        phoneNumber,
        company,
        roleContactId: role,
        photos,
        comment,
      }),
    });
    await checkRequest(response);
    const { page, size } = thunkAPI.getState().contacts;
    thunkAPI.dispatch(getAllContacts({ page, size }));
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});
export const deleteContact = createAsyncThunk('contacts/deleteContact', async ({id}, thunkAPI) => {
  try {
    const response = await fetchWithAuth(`${BASE_URL}contacts/${id}`, {
      method: 'DELETE',
    });
    const { page, size } = thunkAPI.getState().contacts;
    thunkAPI.dispatch(getAllContacts({ page, size }));
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

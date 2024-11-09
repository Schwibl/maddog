import { createAsyncThunk } from '@reduxjs/toolkit';
import { updateSession } from '../redux/features/sessionSlice';

// export async function authorization(name, password, setAuthCode) {
//   const encriptedUserData = btoa(`${name}:${password}`);
//
//   try {
//     const response = await fetch('http://62.113.113.183:8963/api/v1/login', {
//       method: 'POST',
//       headers: {
//         Authorization: `Basic ${encriptedUserData}`,
//         'Content-Type': 'application/json;charset=utf-8',
//       },
//     });
//
//     const result = await response.json();
//     setAuthCode(response.headers.get('x-authorization'));
//
//     return result;
//   } catch (e) {
//     console.error('блок catch', e.message);
//     return null;
//   }
// }
//
// export const createAsyncThunk = (thunkAPI) => {
//   return async (name, password) => {
//     const response = await authorization(name, password, setAuthCode);
//     return response;
//   };
// };

export const authorization = createAsyncThunk(
  'authorization',
  async ({ name, password }, thunkAPI) => {
    try {
      const encriptedUserData = btoa(`${name}:${password}`);

      const response = await fetch('http://62.113.113.183:8963/api/v1/login', {
        method: 'POST',
        headers: {
          Authorization: `Basic ${encriptedUserData}`,
          'Content-Type': 'application/json;charset=utf-8',
        },
      });

      const headerValue = response.headers.get('x-authorization');
      localStorage.setItem('authCode', headerValue);

      const result = await response.json();

      thunkAPI.dispatch(updateSession(result));

      return response;
    } catch (error) {
      console.error('Ошибка при авторизации:', error);
      throw error;
    }
  }
);

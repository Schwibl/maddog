import { configureStore } from '@reduxjs/toolkit';
import maddogReducer from './features/madDogSlice';

export const store = configureStore({
  reducer: {
    fileType: estimateReducer
  },
});

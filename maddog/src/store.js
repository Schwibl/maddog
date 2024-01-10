import { configureStore } from '@reduxjs/toolkit';

import estimateReducer from './features/madDogSlice';

export const store = configureStore({
  reducer: {
    fileType: estimateReducer,
  },
});

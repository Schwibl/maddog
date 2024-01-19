import { configureStore } from '@reduxjs/toolkit';

import estimateReducer from './features/estimateSlice';

export const store = configureStore({
  reducer: {
    estimate: estimateReducer,
  },
});

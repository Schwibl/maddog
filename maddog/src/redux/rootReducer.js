import { combineReducers } from "@reduxjs/toolkit";

import estimateReducer from './features/madDogSlice';

export const rootReducer = combineReducers({
  navigation: estimateReducer,
});
import { combineReducers } from "@reduxjs/toolkit";

import estimateReducer from './features/estimateSlice';

//корневой редьюсер вмещает в себя все редьюсеры хранилища
export const rootReducer = combineReducers({
  estimate: estimateReducer,
});
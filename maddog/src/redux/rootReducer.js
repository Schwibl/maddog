import { combineReducers } from "@reduxjs/toolkit";

import { ContactsReducer } from "./features/contactsSlice";
import estimateReducer from './features/estimateSlice';
import { ModalReducer } from "./features/modalsSlice";

//корневой редьюсер вмещает в себя все редьюсеры хранилища
export const rootReducer = combineReducers({
  estimate: estimateReducer,
  contacts: ContactsReducer,
  modals: ModalReducer
});
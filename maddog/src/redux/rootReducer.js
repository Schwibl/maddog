import { combineReducers } from '@reduxjs/toolkit';

import { ContactsReducer } from './features/contactsSlice';
import estimateReducer from './features/estimateSlice';
import { ModalReducer } from './features/modalsSlice';
import sessionReducer from './features/sessionSlice';
import companiesReducer from './features/companiesSlice';
import { EquipmentReducer } from './features/equipmentSlice';
//корневой редьюсер вмещает в себя все редьюсеры хранилища
export const rootReducer = combineReducers({
  estimate: estimateReducer,
  contacts: ContactsReducer,
  modals: ModalReducer,
  session: sessionReducer,
  companies: companiesReducer,
  equipment: EquipmentReducer,
});

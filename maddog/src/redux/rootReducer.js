import { combineReducers } from '@reduxjs/toolkit';

import { ContactsReducer } from './features/contactsSlice';
import { estimateReducer } from './features/estimateSlice';
import { ModalReducer } from './features/modalsSlice';
import sessionReducer from './features/sessionSlice';
import companiesReducer from './features/companiesSlice';
import { EquipmentReducer } from './features/equipmentSlice';
import { ProjectsReducer } from './features/projectsSlice';
import adminReducer from './features/adminSlice';
//корневой редьюсер вмещает в себя все редьюсеры хранилища
export const rootReducer = combineReducers({
  estimate: estimateReducer,
  contacts: ContactsReducer,
  modals: ModalReducer,
  session: sessionReducer,
  companies: companiesReducer,
  equipment: EquipmentReducer,
  projects: ProjectsReducer,
  admin: adminReducer,
});

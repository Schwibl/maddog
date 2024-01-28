import { createSlice } from '@reduxjs/toolkit';

import { contacts, types } from '../../Pages/ContactsPage/mock';

const initialState = {
  contacts: contacts,
  selectedContact: null,
  isEnabledButtons: false,
  types: types,
};

const ContactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    deleteContact: (state, action) => {
      state.contacts = state.contacts.filter(item=>item.id !== action.payload);
      state.selectedContact = null;
      state.isEnabled = false;
    },
    editContact: (state, action) => {},
    addContact: (state, action) => {},
    addType: (state, action) => {},
    selectContact: (state, action) => {
      state.selectedContact = action.payload;
      state.isEnabled=true;
    },
  },
});

export const { deleteContact, editContact, addContact, addType, selectContact } =
  ContactsSlice.actions;
export const ContactsReducer = ContactsSlice.reducer;

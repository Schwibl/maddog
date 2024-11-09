import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  contacts: [],
  selectedContact: null,
  isEnabledButtons: false,
  possibleRoles: [],
  contactToEdit: null,
  page: 0,
  size: 10,
};

const ContactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    fillContacts: (state, action) => {
      state.contacts = action.payload;
    },
    setContactToEdit: (state, action) => {
      state.contactToEdit = action.payload;
    },
    selectContact: (state, action) => {
      state.selectedContact = action.payload;
      state.isEnabled = true;
    },
    setPossibleRoles: (state, action) => {
      state.possibleRoles = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setSize: (state, action) => {
      state.size = action.payload;
    },
  },
});

export const {
  fillContacts,
  selectContact,
  setPossibleRoles,
  setPage,
  setSize,
} = ContactsSlice.actions;
export const ContactsReducer = ContactsSlice.reducer;

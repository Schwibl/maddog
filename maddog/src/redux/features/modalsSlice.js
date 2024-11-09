import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  modalImage: false,
  modalDeleteContact: false,
  modalCreateContact: false,
  modalEditContact: false,
  modalCreateContactRole: false,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModalImage: (state) => {
      state.modalImage = true;
    },
    openModalDeleteContact: (state) => {
      state.modalDeleteContact = true;
    },
    openModalCreateContact: (state) => {
      state.modalCreateContact = true;
    },
    openModalEditContact: (state) => {
      state.modalEditContact = true;
    },
    openModalCreateContactRole: (state) => {
      state.modalCreateContactRole = true;
    },
    closeModal: (state) => {
      state.modalImage = false;
      state.modalDeleteContact = false;
      state.modalCreateContact = false;
      state.modalEditContact = false;
      state.modalCreateContactRole = false;
    },
  },
});

export const {
  closeModal,
  openModalDeleteContact,
  openModalImage,
  openModalCreateContact,
  openModalEditContact,
  openModalCreateContactRole,
} = modalSlice.actions;

export const ModalReducer = modalSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  modalImage: false,
  modalDeleteContact: false,
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

    closeModal: (state) => {
      state.modalImage = false;
      state.modalDeleteContact = false;
    },
  },
});

export const { closeModal, openModalDeleteContact, openModalImage } = modalSlice.actions;

export const ModalReducer = modalSlice.reducer;

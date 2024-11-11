import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  modalImage: false,
  modalDeleteContact: false,
  modalCreateContact: false,
  modalEditContact: false,
  modalCreateContactRole: false,
  modalEquipment: false,
  photoModal: false,
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
    openModalEquipment: (state) => {
      state.modalEquipment = true;
    },
    openPhotoModal: (state) => {
      state.photoModal = true;
    },
    closeModal: (state) => {
      state.modalImage = false;
      state.modalDeleteContact = false;
      state.modalCreateContact = false;
      state.modalEditContact = false;
      state.modalCreateContactRole = false;
      state.modalEquipment = false;
      state.photoModal = false;
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
  openModalEquipment,
  openPhotoModal,
} = modalSlice.actions;

export const ModalReducer = modalSlice.reducer;

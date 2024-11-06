import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  equipmentList: [],
  selectedEquipment: null,
  listPage: {
    page: 0,
    size: 20
  },
  statusesList: [],
  estimateSections: []
};

const EquipmentSlice = createSlice({
  name: 'equipment',
  initialState,
  reducers: {
    setEquipmentList: (state, action) => {
      state.equipmentList = action.payload;
    },
    setSelectedEquipment: (state, action) => {
      const equipmentId = action.payload;
      state.selectedEquipment = state.equipmentList.find(
        equipment => equipment.id === equipmentId
      );
    },
    setListPage: (state, action) => {
      state.listPage = action.payload;
    },
    setStatusesList: (state, action) => {
      state.statusesList = action.payload;
    },
    setEstimateSections: (state, action) => {
      state.estimateSections = action.payload;
    }
  }
});

export const {
  setEquipmentList,
  setSelectedEquipment,
  setListPage,
  setStatusesList,
  setEstimateSections
} = EquipmentSlice.actions;

export const EquipmentReducer = EquipmentSlice.reducer;

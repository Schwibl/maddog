import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  quantityShift: 1,
  equipmentCost: 10,
  equipmentQuantity: 1,
  equipmentDays: 1,
  equipmentDiscount: 0,
  equipmentTotalWithDiscount: 0,
  headphoneCost: 8,
  headphoneQuantity: 1,
  headphoneDays: 1,
  headphoneDiscount: 0,
  headphoneTotalWithDiscount: 0,
  totalEquipmentPerShift: 0,
  totalEquipmentCostWithDiscount: 0,
  totalDiscount: 0,
  serviceTotal: 0,
  totalTax: 0,
};

const estimateSlice = createSlice({
  name: 'estimate',
  initialState: initialState,
  reducers: {
    updateQuantityShift: (state, action) => {
      state.quantityShift = action.payload;
    },
    updateEquipmentCost: (state, action) => {
      state.equipmentCost = action.payload;
    },
    updateEquipmentQuantity: (state, action) => {
      state.equipmentQuantity = action.payload;
    },
    updateEquipmentDays: (state, action) => {
      state.equipmentDays = action.payload;
    },
    updateEquipmentDiscount: (state, action) => {
      state.equipmentDiscount = action.payload;
    },
    updateEquipmentTotalWithDiscount: (state, action) => {
      state.equipmentTotalWithDiscount = action.payload;
    },
    updateHeadphoneCost: (state, action) => {
      state.headphoneCost = action.payload;
    },
    updateHeadphoneQuantity: (state, action) => {
      state.headphoneQuantity = action.payload;
    },
    updateHeadphoneDays: (state, action) => {
      state.headphoneDays = action.payload;
    },
    updateHeadphoneDiscount: (state, action) => {
      state.headphoneDiscount = action.payload;
    },
    updateHeadphoneTotalWithDiscount: (state, action) => {
      state.headphoneTotalWithDiscount = action.payload;
    },
    updateTotalEquipmentPerShift: (state, action) => {
      state.totalEquipmentPerShift = action.payload;
    },
    updateTotalEquipmentCostWithDiscount: (state, action) => {
      state.totalEquipmentCostWithDiscount = action.payload;
    },
    updateTotalDiscount: (state, action) => {
      state.totalDiscount = action.payload;
    },
    updateServiceTotal: (state, action) => {
      state.serviceTotal = action.payload;
    },
    updateTotalTax: (state, action) => {
      state.totalTax = action.payload;
    },
  },
});

export const {
  updateQuantityShift,
  updateEquipmentCost,
  updateEquipmentQuantity,
  updateEquipmentDays,
  updateEquipmentDiscount,
  updateEquipmentTotalWithDiscount,
  updateHeadphoneCost,
  updateHeadphoneQuantity,
  updateHeadphoneDays,
  updateHeadphoneDiscount,
  updateHeadphoneTotalWithDiscount,
  updateTotalEquipmentPerShift,
  updateTotalEquipmentCostWithDiscount,
  updateTotalDiscount,
  updateServiceTotal,
  updateTotalTax,
} = estimateSlice.actions;

export default estimateSlice.reducer;
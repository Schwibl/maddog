import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentEstimate: null,
  loading: false,
  error: null,
  // Calculator state
  quantityShift: 2,
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
  totalDiscount: 0,
  totalEquipmentPerShiftWithDiscount: 0,
  totalEquipment: 0,
  totalServicePerShift: 0,
  totalService: 0,
  totalCost: 0,
  totalTax: 0,
  totalCostWithTax: 0,
};

const estimateSlice = createSlice({
  name: 'estimate',
  initialState,
  reducers: {
    // Current estimate actions
    setCurrentEstimate: (state, action) => {
      state.currentEstimate = action.payload;
    },
    clearCurrentEstimate: (state) => {
      state.currentEstimate = null;
    },
    // Calculator actions
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
    updateTotalDiscount: (state, action) => {
      state.totalDiscount = action.payload;
    },
    updateTotalEquipmentPerShiftWithDiscount: (state, action) => {
      state.totalEquipmentPerShiftWithDiscount = action.payload;
    },
    updateTotalEquipment: (state, action) => {
      state.totalEquipment = action.payload;
    },
    updateTotalServicePerShift: (state, action) => {
      state.totalServicePerShift = action.payload;
    },
    updateTotalService: (state, action) => {
      state.totalService = action.payload;
    },
    updateTotalCost: (state, action) => {
      state.totalCost = action.payload;
    },
    updateTotalTax: (state, action) => {
      state.totalTax = action.payload;
    },
    updateTotalCostWithTax: (state, action) => {
      state.totalCostWithTax = action.payload;
    },
  }
});

export const {
  // Current estimate actions
  setCurrentEstimate,
  clearCurrentEstimate,
  // Calculator actions
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
  updateTotalDiscount,
  updateTotalEquipmentPerShiftWithDiscount,
  updateTotalEquipment,
  updateTotalServicePerShift,
  updateTotalService,
  updateTotalCost,
  updateTotalTax,
  updateTotalCostWithTax,
} = estimateSlice.actions;

export const estimateReducer = estimateSlice.reducer;
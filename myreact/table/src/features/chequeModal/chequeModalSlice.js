import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'chequeModal',
  initialState: {
    kioskName: '',
    chequeType: 0,
    pays: [],
    sum: 0,
    positions: []
  },
  reducers: {
    chequeModalKioskNameChanged: (chequeModal, action) => {
      chequeModal.kioskName = action.payload;
    },

    chequeModalChequeTypeChanged: (chequeModal, action) => {
      chequeModal.chequeType = action.payload;
    },

    chequeModalPaySumChanged: (chequeModal, action) => {
      const index = chequeModal.pays.findIndex(pay => pay.uid === action.payload.uid);
      chequeModal.pays[index].sum = action.payload.sum;
    },

    chequeModalPayAdded: (chequeModal, action) => {
      chequeModal.pays.push({ uid: Date.now(), sum: 1 });
    },

    chequeModalPayRemoved: (chequeModal, action) => {
      const index = chequeModal.pays.findIndex(pay => pay.uid === action.payload);
      chequeModal.pays.splice(index, 1);
    },

    chequeModalSumChanged: (chequeModal, action) => {
      chequeModal.sum = action.payload;
    },

    chequeModalPositionAdded: (chequeModal, action) => {
      chequeModal.positions.push({ name: '', quantity: 1, price: 1 });
    },

    chequeModalPositionRemoved: (chequeModal, action) => {
      chequeModal.positions.splice(action.payload, 1);
    },

    chequeModalPositionNameChanged: (chequeModal, action) => {
      const { index, name } = action.payload;
      chequeModal.positions[index].name = name;
    },

    chequeModalPositionQuantityChanged: (chequeModal, action) => {
      const { index, quantity } = action.payload;
      chequeModal.positions[index].quantity = quantity;
    },

    chequeModalPositionPriceChanged: (chequeModal, action) => {
      const { index, price } = action.payload;
      chequeModal.positions[index].price = price;
    },

    chequeModalReset: (chequeModal) => {
      chequeModal.kioskName = '';
      chequeModal.chequeType = 0;
      chequeModal.pays = [];
      chequeModal.sum = 0;
      chequeModal.positions = [];
    }
  }
});

export const {
  chequeModalKioskNameChanged,
  chequeModalChequeTypeChanged,
  chequeModalPaySumChanged,
  chequeModalPayAdded,
  chequeModalPayRemoved,
  chequeModalSumChanged,
  chequeModalPositionAdded,
  chequeModalPositionRemoved,
  chequeModalPositionNameChanged,
  chequeModalPositionQuantityChanged,
  chequeModalPositionPriceChanged,
  chequeModalReset
} = slice.actions;
export default slice.reducer;

// Selector
export const selectChequeModal = state => state.entities.chequeModal;
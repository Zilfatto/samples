import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'chequeModal',
  initialState: {
    kioskName: '',
    chequeType: 0,
    pays: [],
    activePayUid: null,
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
      const { uid, sum } = action.payload;
      const index = chequeModal.pays.findIndex(pay => pay.uid === uid);
      chequeModal.pays[index].sum = sum;
      chequeModal.activePayUid = uid;
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
      chequeModal.sum = calculateSum(chequeModal.positions);
    },

    chequeModalPositionRemoved: (chequeModal, action) => {
      chequeModal.positions.splice(action.payload, 1);
      chequeModal.sum = calculateSum(chequeModal.positions);
    },

    chequeModalPositionNameChanged: (chequeModal, action) => {
      const { index, name } = action.payload;
      chequeModal.positions[index].name = name;
    },

    chequeModalPositionQuantityChanged: (chequeModal, action) => {
      const { index, quantity } = action.payload;
      const { pays, positions } = chequeModal;

      positions[index].quantity = quantity;

      const sum = calculateSum(positions);
      const firstInvalid = validatePays(pays, sum);
      // Update the sum
      chequeModal.sum = sum;
      // Cut off all the invalid items
      chequeModal.pays.splice(firstInvalid);
    },

    chequeModalPositionPriceChanged: (chequeModal, action) => {
      const { index, price } = action.payload;
      const { pays, positions } = chequeModal;

      positions[index].price = price;

      const sum = calculateSum(positions);
      const firstInvalid = validatePays(pays, sum);
      // Update the sum
      chequeModal.sum = sum;
      // Cut off all the invalid items
      chequeModal.pays.splice(firstInvalid);
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



function calculateSum(items) {
  return items.reduce((total, item) => total + item.quantity * item.price, 0);
}

function validatePays(pays, sum) {
  let firstInvalid = 0;
  if (!pays[0]) return firstInvalid;

  let total = 0;
  let firstExceeded = true;

  pays.forEach((pay, index) => {
    const paySum = pay.sum;
    total += paySum;
    if (total <= sum) {
      firstInvalid = index + 1;
      return;
    }
    if (firstExceeded) {
      pay.sum = paySum - (total - sum);
      firstExceeded = false;
      firstInvalid = index + 1;
      return;
    }
  });

  return firstInvalid;
}
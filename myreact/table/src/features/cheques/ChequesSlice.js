import { createSlice } from '@reduxjs/toolkit';
import { apiCallBegan } from '../../app/fakeApiActions';

// Reducer
const slice = createSlice({
  name: 'cheques',
  initialState: [],
  reducers: {
    chequesSucceeded: (cheques, action) => {
      cheques.splice(0, 0, ...action.payload.data.cheques);
    },

    chequeAdded: (cheques, action) => {
      const {
        kioskName,
        chequeType,
        pay,
        sum,
        quantity,
        position
      } = action.payload;

      cheques.push({
        uid: Date.now(),
        dateReg: new Date().toISOString(),
        kioskName,
        chequeType,
        sum,
        pays: [{ sum: pay }],
        positions: [{ quantity, position }]
      });
    },

    chequeRemoved: (cheques, action) => {
      const index = cheques.findIndex(cheque => cheque.uid === action.payload.id);
      cheques.splice(index, 1);
    }
  }
});

export const { chequeAdded, chequeRemoved } = slice.actions;
export default slice.reducer;

// Action Creators
export const loadCheques = () =>
  apiCallBegan({
    onSuccess: slice.actions.chequesSucceeded.type
  });


// Selector
export const selectCheques = state => state.entities.cheques;
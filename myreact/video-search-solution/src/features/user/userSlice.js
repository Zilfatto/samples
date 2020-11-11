import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'user',
  initialState: {},
  reducers: {
    userLoggedIn: (user, action) => {
      user.id = action.payload.id;
      user.username = action.payload.username;
    }
  }
});

export const { userLoggedIn } = slice.actions;
export default slice.reducer;

// Selector
export const selectUser = state => state.entities.user;
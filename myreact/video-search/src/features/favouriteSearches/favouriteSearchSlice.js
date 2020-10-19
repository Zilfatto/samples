import { createSlice } from '@reduxjs/toolkit';

// Reducer
const slice = createSlice({
  name: 'favouriteSearches',
  initialState: [],
  reducers: {
    favouriteSearchAdded: (favouriteSearches, action) => {
      favouriteSearches.push({ ...action.payload, id: Date.now() });
    },

    favouriteSearchChanged: (favouriteSearches, action) => {
      const index = favouriteSearches.findIndex(search => search.id === action.payload.id);
      favouriteSearches[index] = { ...action.payload };
    },

    favouriteSearchRemoved: (favouriteSearches, action) => {
      const index = favouriteSearches.findIndex(search => search.id === action.payload.id);
      favouriteSearches.splice(index, 1);
    },

    favouriteSearchesLoaded: (favouriteSearches, action) => {
      favouriteSearches.splice(0, 0, ...action.payload);
    }
  }
});

export const {
  favouriteSearchAdded,
  favouriteSearchChanged,
  favouriteSearchRemoved,
  favouriteSearchesLoaded
} = slice.actions;
export default slice.reducer;

// Selector
export const selectFavouriteSearches = state => state.entities.favouriteSearches;
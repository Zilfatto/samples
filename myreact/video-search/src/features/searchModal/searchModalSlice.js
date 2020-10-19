import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'searchModal',
  initialState: {
    searchModalData: {
      name: '',
      params: {
        q: '',
        order: 'relevance',
        maxResults: 25
      }
    },
    queryInputDisabled: true
  },
  reducers: {
    searchModalValuesUpdated: (searchModal, action) => {
      const { searchModalData, queryInputDisabled } = action.payload;
      searchModal.searchModalData = searchModalData;
      searchModal.queryInputDisabled = queryInputDisabled;
    },

    searchModalQueryChanged: (searchModal, action) => {
      searchModal.searchModalData.params.q = action.payload;
    },

    searchModalNameChanged: (searchModal, action) => {
      searchModal.searchModalData.name = action.payload;
    },

    searchModalOrderChanged: (searchModal, action) => {
      searchModal.searchModalData.params.order = action.payload;
    },

    searchModalMaxResultsChanged: (searchModal, action) => {
      searchModal.searchModalData.params.maxResults = action.payload;
    }
  }
});

export const {
  searchModalValuesUpdated,
  searchModalQueryChanged,
  searchModalNameChanged,
  searchModalOrderChanged,
  searchModalMaxResultsChanged
} = slice.actions;
export default slice.reducer;

// Selector
export const selectSearchModal = state => state.entities.searchModal;
export const selectSearchModalData = state => state.entities.searchModal.searchModalData;
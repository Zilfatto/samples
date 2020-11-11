import { createSlice } from '@reduxjs/toolkit';
import { apiCallBegan } from '../../app/apiActions';
import { youTubeUrl } from '../../config.json';

// Reducer
const slice = createSlice({
  name: 'videoSearch',
  initialState: {
    value: '',
    active: false,
    result: null
  },
  reducers: {
    videoSearchEnteredValue: (videoSearch, action) => {
      videoSearch.value = action.payload;
    },

    videoSearchActivated: (videoSearch, action) => {
      videoSearch.active = true;
    },

    videoSearchSucceeded: (videoSearch, action) => {
      videoSearch.active = false;
      videoSearch.result = action.payload;
    },

    videoSearchFailed: (videoSearch, action) => {
      videoSearch.active = false;
    }
  }
});

export const { videoSearchEnteredValue } = slice.actions;
export default slice.reducer;

// Action Creators
const url = youTubeUrl;

export const searchVideos = valueObj =>
  apiCallBegan({
    url,
    data: valueObj,
    onStart: slice.actions.videoSearchActivated.type,
    onSuccess: slice.actions.videoSearchSucceeded.type,
    onError: slice.actions.videoSearchFailed.type
  });


// Selector
export const selectVideoSearch = state => state.entities.videoSearch;
export const selectVideoSearchValue = state => state.entities.videoSearch.value;
export const selectVideoSearchResult = state => state.entities.videoSearch.result;
import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'videos',
  initialState: {
    view: 'list'
  },
  reducers: {
    videosViewChanged: (videos, action) => {
      videos.view = action.payload;
    }
  }
});

export const { videosViewChanged } = slice.actions;
export default slice.reducer;

// Selector
export const selectVideosView = state => state.entities.videos.view;
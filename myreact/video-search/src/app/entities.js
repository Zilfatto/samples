import { combineReducers } from 'redux';
import userReducer from '../features/user/userSlice';
import favouriteSearchesReducer from '../features/favouriteSearches/favouriteSearchSlice';
import videoSearchReducer from '../features/videoSearch/videoSearchSlice';
import videosReducer from '../features/videos/videosSlice';
import searchModalReducer from '../features/searchModal/searchModalSlice';

export default combineReducers({
  user: userReducer,
  favouriteSearches: favouriteSearchesReducer,
  videoSearch: videoSearchReducer,
  videos: videosReducer,
  searchModal: searchModalReducer
});
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SearchModal from '../searchModal/SearchModal';
import { videoSearchEnteredValue, searchVideos } from '../videoSearch/videoSearchSlice';
import { searchModalValuesUpdated, selectSearchModalData } from '../searchModal/searchModalSlice';
import {
  favouriteSearchChanged,
  favouriteSearchRemoved,
  selectFavouriteSearches
} from './favouriteSearchSlice';

const FavouriteSearches = (props) => {
  const dispatch = useDispatch();
  const searchModalData = useSelector(selectSearchModalData);
  const favourites = useSelector(selectFavouriteSearches);
  const [modalVisible, setModalVisible] = useState(false);

  const handleExecution = params => {
    dispatch(videoSearchEnteredValue(params.q));
    dispatch(searchVideos(params));
    props.history.push('/');
  };

  const handleSearchModalOpening = favourite => {
    dispatch(searchModalValuesUpdated({
      searchModalData: {
        ...favourite
      },
      queryInputDisabled: false
    }));
    setModalVisible(true);
  };

  const handleFavouriteChange = () => {
    dispatch(favouriteSearchChanged(searchModalData));
    setModalVisible(false);
  };

  return (
    <div className="container-fluid">
      <h1 className="favourite-header">Избранное</h1>
      <div>
        {favourites.map(favourite => {
          return (
            <div key={favourite.id} className="container">
              <span className="container__text">{favourite.params.q}</span>
              <button className="container__side-btn btn-remove" onClick={() => dispatch(favouriteSearchRemoved(favourite.id))}>Удалить</button>
              <button className="container__side-btn btn-change" onClick={() => handleSearchModalOpening(favourite)}>Изменить</button>
              <button className="container__side-btn btn-execute" onClick={() => handleExecution(favourite.params)}>Выполнить</button>
            </div>
          );
        })}
      </div>
      <SearchModal
        title="Изменить запрос"
        visible={modalVisible}
        onOk={handleFavouriteChange}
        onCancel={() => setModalVisible(false)}
      />
    </div>
  );
}

export default FavouriteSearches;
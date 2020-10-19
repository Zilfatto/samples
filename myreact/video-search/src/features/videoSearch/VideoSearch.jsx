import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Videos from '../videos/Videos';
import SearchModal from '../searchModal/SearchModal';
import { Input, Popover } from 'antd';
import { HeartOutlined } from '@ant-design/icons';
import { favouriteSearchAdded } from '../favouriteSearches/favouriteSearchSlice';
import { searchModalValuesUpdated, selectSearchModalData } from '../searchModal/searchModalSlice';
import {
  videoSearchEnteredValue,
  searchVideos,
  selectVideoSearchValue,
  selectVideoSearchResult
} from './videoSearchSlice';

const VideoSearch = () => {
  const dispatch = useDispatch();
  const storeSearchValue = useSelector(selectVideoSearchValue);
  const searchModalData = useSelector(selectSearchModalData);
  const videoSearchResult = useSelector(selectVideoSearchResult);
  const [searchValue, setSearchValue] = useState(storeSearchValue);
  const [modalVisible, setModalVisible] = useState(false);
  const [savedSearch, setSavedSearch] = useState(false)
  const { Search } = Input;
  const containerClass = videoSearchResult ? 'search-flex-container-active' : 'search-flex-container';

  const handleSearchChange = e => {
    const { value } = e.target;
    setSearchValue(value);
  };

  const handleSearch = value => {
    dispatch(videoSearchEnteredValue(value));
    if (value) dispatch(searchVideos({ q: value }));
  };

  const handleSearchModalOpening = () => {
    dispatch(searchModalValuesUpdated({
      searchModalData: {
        name: '',
        params: {
          q: storeSearchValue,
          order: 'relevance',
          maxResults: 25
        }
      },
      queryInputDisabled: true
    }));
    setModalVisible(true);
  };

  const handleSearchSave = () => {
    if (!storeSearchValue) return;
    dispatch(favouriteSearchAdded(searchModalData));
    setModalVisible(false);
    setSavedSearch(true);
  };

  const content = (
    <div style={{ maxWidth: '200px' }}>
      <p>Поиск сохранён в разделе &#34;Избранное&#34;</p>
      <Link className="nav-link" to="/favourites">
        Перейти в избранное
      </Link>
    </div>
  );

  const suffix = (
    <Popover placement="bottom" content={content} trigger="click" visible={savedSearch}>
      <HeartOutlined
        style={{
          fontSize: 16,
        }}
        className={savedSearch ? 'active-saved-icon' : 'saved-icon'}
        onClick={handleSearchModalOpening}
      />
    </Popover>
  );

  return (
    <div className={containerClass}>
      <div className="container-fluid">
        <h1>Поиск видео</h1>
        <Search
          value={searchValue}
          placeholder="Что хотите посмотреть?"
          enterButton="Найти"
          size="large"
          onChange={handleSearchChange}
          onSearch={handleSearch}
          suffix={suffix}
        />
        <Videos />
        <SearchModal
          title="Сохранить запрос"
          visible={modalVisible}
          onOk={handleSearchSave}
          onCancel={() => setModalVisible(false)}
        />
      </div>
    </div>
  );
}

export default VideoSearch;
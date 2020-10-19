import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UnorderedListOutlined, AppstoreOutlined } from '@ant-design/icons';
import { videosViewChanged, selectVideosView } from './videosSlice';

const View = () => {
  const dispatch = useDispatch();
  const videosView = useSelector(selectVideosView);

  return (
    <div className="videos-header__btns">
      <button
        onClick={() => dispatch(videosViewChanged('list'))}
        style={{ opacity: (videosView === 'list') ? '1' : '0.4' }}
      >
        <UnorderedListOutlined />
      </button>
      <button
        onClick={() => dispatch(videosViewChanged('grid'))}
        style={{ opacity: (videosView === 'grid') ? '1' : '0.4' }}
      >
        <AppstoreOutlined />
      </button>
    </div>
  );
}

export default View;
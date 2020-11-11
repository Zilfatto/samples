import React from 'react';
import { useSelector } from 'react-redux';
import View from './View';
import { Row, Col } from 'antd';
import { selectVideoSearch } from '../videoSearch/videoSearchSlice';
import { selectVideosView } from '../videos/videosSlice';

const Videos = () => {
  const { result, value: videoSearchValue } = useSelector(selectVideoSearch);
  const videosView = useSelector(selectVideosView);
  const span = videosView === 'list' ? 24 : 6;

  return (
    <React.Fragment>
      {result &&
        <div className="videos-header">
          <div className="container">
            <h3 style={{ float: 'left' }}>Видео по запросу &#34;{videoSearchValue}&#34;</h3>
            <View />
          </div>
          <div>
            <Row gutter={[24, 24]}>
              {result.items.map(item => {
                return (
                  <Col key={item.id.videoId} span={span}>
                    <Row gutter={[8, 8]}>
                      <Col span={videosView === 'list' ? 6 : 24}>
                        <img alt={item.snippet.title} src={item.snippet.thumbnails.medium.url} />
                      </Col>
                      <Col span={videosView === 'list' ? 18 : 24}>
                        <h3>{item.snippet.title}</h3>
                        <p>{item.snippet.description}</p>
                      </Col>
                    </Row>
                  </Col>
                )
              })}
            </Row>
          </div>
        </div>}
    </React.Fragment>
  );
}

export default Videos;
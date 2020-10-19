import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Select, Input, Slider, InputNumber, Row, Col } from 'antd';
import {
  searchModalQueryChanged,
  searchModalNameChanged,
  searchModalOrderChanged,
  searchModalMaxResultsChanged,
  selectSearchModal
} from './searchModalSlice';

const SearchModal = (props) => {
  const dispatch = useDispatch();
  const { searchModalData, queryInputDisabled } = useSelector(selectSearchModal);
  const { Option } = Select;

  const handleQueryInput = (e) => {
    const { value } = e.target;
    dispatch(searchModalQueryChanged(value));
  };

  const handleNameInput = (e) => {
    const { value } = e.target;
    dispatch(searchModalNameChanged(value));
  };

  const handleSelect = (value) => {
    dispatch(searchModalOrderChanged(value))
  };

  const handleMaxResultsInput = (value) => {
    dispatch(searchModalMaxResultsChanged(value));
  };

  return (
    <Modal
      {...props}
      centered
    >
      <Input
        onChange={handleQueryInput}
        value={searchModalData.params.q}
        disabled={queryInputDisabled}
      />
      <Input
        placeholder="Название"
        onChange={handleNameInput}
        value={searchModalData.name}
      />
      <Select
        showSearch
        style={{ width: '100%' }}
        defaultValue={searchModalData.params.order}
        optionFilterProp="children"
        onChange={handleSelect}
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        <Option value="relevance">Без сортировки</Option>
        <Option value="date">Date</Option>
        <Option value="rating">Rating</Option>
        <Option value="title">Title</Option>
        <Option value="videoCount">VideoCount</Option>
        <Option value="viewCount">ViewCount</Option>
      </Select>
      <Row>
        <Col span={18}>
          <Slider
            min={1}
            max={50}
            onChange={handleMaxResultsInput}
            value={searchModalData.params.maxResults}
          />
        </Col>
        <Col span={4}>
          <InputNumber
            min={1}
            max={50}
            style={{ margin: '0 16px' }}
            value={searchModalData.params.maxResults}
            onChange={handleMaxResultsInput}
          />
        </Col>
      </Row>
    </Modal>
  );
}

export default SearchModal;
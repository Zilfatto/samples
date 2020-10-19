import React from 'react';
import PropTypes from 'prop-types';

const ListGroup = ({ items, selectedItem, onItemSelect, textProperty, valueProperty }) => {
  return (
    <ul className="list-group">
      {items.map(item => (
        <li
          key={item[valueProperty]}
          className={
            item === selectedItem
              ? 'clickable list-group-item active'
              : 'clickable list-group-item'
          }
          onClick={() => onItemSelect(item)}
        >
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
}

ListGroup.propTypes = {
  items: PropTypes.array.isRequired,
  onItemSelect: PropTypes.func.isRequired,
  selectedItem: PropTypes.object,
  textProperty: PropTypes.string,
  valueProperty: PropTypes.string
};

ListGroup.defaultProps = {
  textProperty: 'name',
  valueProperty: '_id'
};

export default ListGroup;
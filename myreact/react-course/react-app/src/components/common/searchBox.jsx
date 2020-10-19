import React from 'react';
import PropTypes from 'prop-types';

const SearchBox = ({ onChange, ...rest }) => {
  return (
    <div className="form-group">
      <input
        id={rest.name}
        onChange={(e) => onChange(e.currentTarget.value)}
        {...rest}
      />
    </div>
  );
}

SearchBox.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

export default SearchBox;
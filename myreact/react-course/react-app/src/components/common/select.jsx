import React from 'react';
import PropTypes from 'prop-types';

const Select = ({ name, label, error, options, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <select {...rest} name={name} id={name}>
        <option value="" />
        {options.map(option => (
          <option key={option._id} value={option._id}>
            {option.name}
          </option>
        ))}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
}

Select.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  error: PropTypes.string,
  options: PropTypes.array,
  label: PropTypes.string,
  className: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

Select.defaultProps = {
  className: 'form-control'
};

export default Select;

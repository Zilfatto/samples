import React, { Component } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';

class TableBody extends Component {
  renderCell = (item, column) => {
    if (column.content) return column.content(item, this.props.valueProperty);
    return _.get(item, column.path);
  };

  createKey = (item, column) => {
    return item[this.props.valueProperty] + (column.path || column.key)
  };

  render() {
    const { data, columns, valueProperty } = this.props;

    return (
      <tbody>
        {data.map(item => (
          <tr key={item[valueProperty]}>
            {columns.map(column => (
              <td key={this.createKey(item, column)}>
                {this.renderCell(item, column)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

TableBody.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  valueProperty: PropTypes.string
};

TableBody.defaultProps = {
  valueProperty: '_id'
};

export default TableBody
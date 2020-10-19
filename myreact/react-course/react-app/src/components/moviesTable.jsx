import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Table from './common/table';
import Like from './common/like';
import auth from '../services/authService';
import PropTypes from 'prop-types';

class MoviesTable extends Component {
  columns = [
    {
      path: 'title',
      label: 'Title',
      content: (item, valueProperty) => <Link to={`/movies/${item[valueProperty]}`}>{item.title}</Link>
    },
    { path: 'genre.name', label: 'Genre' },
    { path: 'numberInStock', label: 'Stock' },
    { path: 'dailyRentalRate', label: 'Rate' },
    {
      key: 'like',
      content: item => <Like liked={item.liked} onClick={() => this.props.onLike(item)} />
    }
  ];

  deleteColumn = {
    key: 'delete',
    content: (item, valueProperty) => (
      <button
        onClick={() => this.props.onDelete(item[valueProperty])}
        className="btn btn-danger btn-sm"
      >
        Delete
      </button>
    )
  };

  constructor() {
    super();
    const user = auth.currentUser;
    if (user && user.isAdmin)
      this.columns.push(this.deleteColumn);
  }

  render() {
    const { movies, ...rest } = this.props;

    return (
      <Table
        {...rest}
        data={movies}
        columns={this.columns}
      />
    );
  }
}

MoviesTable.propTypes = {
  movies: PropTypes.array.isRequired,
  sortColumn: PropTypes.object.isRequired,
  onLike: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onSort: PropTypes.func.isRequired
};

export default MoviesTable;
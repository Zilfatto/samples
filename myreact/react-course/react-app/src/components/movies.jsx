import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import MoviesTable from './moviesTable';
import Pagination from './common/pagination';
import ListGroup from './common/listGroup';
import SearchBox from './common/searchBox';
import { getMovies, deleteMovie } from '../services/movieService';
import { getGenres } from '../services/genreService';
import { paginate } from '../utils/paginate';
import _ from 'lodash';
import PropTypes from 'prop-types';

class Movies extends Component {
  state = {
    // Set them to empty arrays, otherwise we will get an error
    movies: [],
    genres: [],
    currentPage: 1,
    pageSize: 4,
    selectedGenre: { _id: '', name: 'All Genres' },
    sortColumn: { path: 'title', order: 'asc' },
    searchQuery: ''
  };
  // In the real-world app we're going to call back-end services to get these data,
  //because it will take some time
  async componentDidMount() {
    let genresFromDB = getGenres();
    const moviesFromDB = getMovies();

    ({ data: genresFromDB } = await genresFromDB);
    const { data: movies } = await moviesFromDB;

    const genres = [this.state.selectedGenre, ...genresFromDB];
    this.setState({ movies, genres });
  }

  handleDelete = async movieId => {
    const {
      movies: originalMovies,
      currentPage,
      selectedGenre,
      pageSize
    } = this.state;
    const movies = originalMovies.filter(m => m._id !== movieId);

    const movieCount = selectedGenre._id
      ? movies.filter(m => m.genre._id === selectedGenre._id).length
      : movies.length;

    this.setState({
      movies,
      currentPage: (Math.ceil(movieCount / pageSize) === currentPage - 1) ? currentPage - 1 : currentPage
    });

    try {
      await deleteMovie(movieId);
    }
    catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error('This movie has already been deleted.');

      this.setState({ movies: originalMovies, currentPage });
    }
  };

  handleLike = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movie };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = genre => {
    this.setState({ selectedGenre: genre, currentPage: 1, searchQuery: '' });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  handleSearch = searchQuery => {
    this.setState({ searchQuery, selectedGenre: this.state.genres[0] || {}, currentPage: 1 });
  };

  getPagedData = (pageSize, currentPage, selectedGenre, allMovies, sortColumn, searchQuery) => {
    let filtered = allMovies;

    if (searchQuery) filtered = this.searchByTitle(allMovies, searchQuery);
    else if (selectedGenre._id) filtered = allMovies.filter(m => m.genre._id === selectedGenre._id);

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: movies };
  };

  searchByTitle = (items, query) => {
    const pattern = new RegExp(`^${query}`, 'i');
    return items.filter(item => pattern.test(item.title));
  };

  render() {
    const {
      pageSize,
      currentPage,
      selectedGenre,
      genres,
      movies: allMovies,
      sortColumn,
      searchQuery
    } = this.state;
    const { user } = this.props;

    const {
      totalCount,
      data: movies
    } = this.getPagedData(pageSize, currentPage, selectedGenre, allMovies, sortColumn, searchQuery);

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={genres}
            selectedItem={selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col">
          {user && <Link
            to="/movies/new"
            className="btn btn-primary mb-3"
          >
            New Movie
          </Link>}
          <p>Showing {totalCount} movies in the database</p>
          <SearchBox
            name="search"
            value={searchQuery}
            onChange={this.handleSearch}
            placeholder="Seacrh..."
            className="form-control my-3"
          />
          <MoviesTable
            movies={movies}
            sortColumn={sortColumn}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
          <Pagination
            onPageChange={this.handlePageChange}
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
          />
        </div>
      </div>
    );
  }
}

Movies.propTypes = {
  user: PropTypes.object,
};

export default Movies;
const { Movie, validate } = require('../models/movie');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const validateObjectId = require('../middleware/validateObjectId');
const isValidObjectId = require('../utils/isValidObjectId');
const { Genre } = require('../models/genre');
const _ = require('lodash');
const moment = require('moment');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const movies = await Movie.find().sort('title').select('-__v');
  res.send(movies);
});

router.post('/', auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { genreId } = req.body;
  if (!isValidObjectId(genreId))
    return res.status(400).send('Invalid genreID.');

  const genre = await Genre.findById(genreId).select('-__v');
  if (!genre) return res.status(404).send('The genre with the given ID was not found.');

  const movie = new Movie({
    ..._.pick(req.body, ['title', 'numberInStock', 'dailyRentalRate']),
    genre,
    publishDate: moment().toJSON()
  });

  await movie.save();
  res.send(movie);
});

router.put('/:id', auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { genreId } = req.body;
  if (!isValidObjectId(genreId))
    return res.status(400).send('Invalid genreID.');

  const genre = await Genre.findById(genreId).select('-__v');
  if (!genre)
    return res.status(404).send('The genre with the given ID was not found.');

  const movie = await Movie.findByIdAndUpdate(
    req.params.id,
    {
      ..._.pick(req.body, ['title', 'numberInStock', 'dailyRentalRate']),
      genre
    },
    { new: true, runValidators: true }
  );
  if (!movie)
    return res.status(404).send('The movie with the given ID was not found.');

  res.send(movie);
});

router.delete('/:id', [auth, admin, validateObjectId], async (req, res) => {
  const movie = await Movie.findByIdAndRemove(req.params.id);
  if (!movie)
    return res.status(404).send('The movie with the given ID was not found.');

  res.send(movie);
});

router.get('/:id', validateObjectId, async (req, res) => {
  const movie = await Movie.findById(req.params.id).select('-__v');
  if (!movie)
    return res.status(404).send('The movie with the given ID was not found.');

  res.send(movie);
});

module.exports = router;
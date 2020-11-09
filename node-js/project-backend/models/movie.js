const Joi = require('joi');
const mongoose = require('mongoose');
const { genreSchema } = require('./genre');

const Movie = mongoose.model('Movie', new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    match: /^([A-Za-z]|\s|-)*$/,
    maxLength: 255,
    set: v => v[0].toUpperCase() + v.slice(1)
  },
  genre: {
    type: genreSchema,
    required: true
  },
  numberInStock: {
    type: Number,
    min: 0,
    max: 10000,
    set: v => Math.round(v)
  },
  dailyRentalRate: {
    type: Number,
    min: 0,
    max: 10,
    set: v => Number(v.toFixed(1))
  }
}));

function validateMovie(movie) {
  const schema = {
    title: Joi.string().max(255).required(),
    genreId: Joi.objectId().max(63).required(),
    numberInStock: Joi.number().min(0).max(10000),
    dailyRentalRate: Joi.number().min(0).max(10)
  };

  return Joi.validate(movie, schema);
}

exports.Movie = Movie;
exports.validate = validateMovie;
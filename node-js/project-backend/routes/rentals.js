const { Rental, validate } = require('../models/rental');
const { Customer } = require('../models/customer');
const { Movie } = require('../models/movie');
const auth = require('../middleware/auth');
const validateObjectId = require('../middleware/validateObjectId');
const isValidObjectId = require('../utils/isValidObjectId');
const Fawn = require('fawn');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

Fawn.init(mongoose);

router.get('/', async (req, res) => {
  const rentals = await Rental.find()
    .sort('-dateOut')
    .select('-__v');
  res.send(rentals);
});

router.post('/', auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { customerId, movieId } = req.body;
  if (!isValidObjectId(customerId))
    return res.status(400).send('Invalid customerID.');
  else if (!isValidObjectId(movieId))
    return res.status(400).send('Invalid movieID.');

  const pendingCustomer = Customer.findById(customerId).select('-__v');
  const pendingMovie = Movie.findById(movieId);

  const customer = await pendingCustomer;
  const movie = await pendingMovie;

  if (!customer) return res.status(404).send('The customer with the given ID was not found.');
  else if (!movie) return res.status(404).send('The movie with the given ID was not found.');
  else if (movie.numberInStock === 0) return res.status(400).send('Movie is not in stock.');

  const rental = new Rental({
    customer,
    movie: {
      _id: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate
    }
  });

  new Fawn.Task()
    .save('rentals', rental)
    .update('movies',
      { _id: movie._id },
      {
        $inc: { numberInStock: -1 }
      }
    )
    .run();

  res.send(rental);
});

router.get('/:id', [auth, validateObjectId], async (req, res) => {
  const rental = await Rental.findById(req.params.id).select("-__v");

  if (!rental)
    return res.status(404).send("The rental with the given ID was not found.");

  res.send(rental);
});

module.exports = router;
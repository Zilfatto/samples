const auth = require('../middleware/auth');
const validateObjectId = require('../middleware/validateObjectId');
const { Customer, validate } = require('../models/customer');
const _ = require('lodash');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const customers = await Customer.find().sort('name').select('-__v');
  res.send(customers);
});

router.post('/', auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = new Customer(_.pick(req.body, ['name', 'phone', 'isGold']));

  await customer.save();
  res.send(customer);
});

router.put('/:id', auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findByIdAndUpdate(req.params.id,
    _.pick(req.body, ['name', 'phone', 'isGold']),
    { new: true, runValidators: true });

  if (!customer) return res.status(404).send('The customer with the given ID was not found.');
  res.send(customer);
});

router.delete('/:id', [auth, validateObjectId], async (req, res) => {
  const customer = await Customer.findByIdAndRemove(req.params.id);
  if (!customer) return res.status(404).send('The customer with the given ID was not found.');
  res.send(customer);
});

router.get('/:id', validateObjectId, async (req, res) => {
  const customer = await Customer.findById(req.params.id).select('-__v');
  if (!customer) return res.status(404).send('The customer with the given ID was not found.');
  res.send(customer);
});

module.exports = router;
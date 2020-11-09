const Joi = require('joi');
const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    match: /^([A-Za-z]|\s|-)*$/,
    maxLength: 255
  },
  phone: {
    type: String,
    required: true,
    trim: true,
    maxLength: 255,
    match: /^([0-9]|\s|-)*$/
  },
  isGold: {
    type: Boolean,
    default: false
  }
});

const Customer = mongoose.model('Customer', customerSchema);

function validateCustomer(customer) {
  const schema = {
    name: Joi.string().max(255).required().label('Your name'),
    phone: Joi.string().max(255).required().label('Your phone'),
    isGold: Joi.boolean().label('Gold')
  };

  return Joi.validate(customer, schema);
}

exports.Customer = Customer;
exports.customerSchema = customerSchema;
exports.validate = validateCustomer;
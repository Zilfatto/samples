const Joi = require('joi');
const mongoose = require('mongoose');
const { customerSchema } = require('./customer')

const Rental = mongoose.model('Rental', new mongoose.Schema({
  customer: {
    type: customerSchema,
    required: true
  },
  movie: {
    type: new mongoose.Schema({
      title: {
        type: String,
        required: true,
        trim: true,
        match: /^([A-Za-z]|\s|-)*$/,
        maxLength: 255,
        set: v => v[0].toUpperCase() + v.slice(1)
      },
      dailyRentalRate: {
        type: Number,
        min: 0,
        max: 10,
        set: v => Number(v.toFixed(1))
      }
    }),
    required: true
  },
  dateOut: {
    type: Date,
    required: true,
    default: Date.now
  },
  dateReturned: {
    type: Date
  },
  rentalFee: {
    type: Number,
    min: 0,
    set: v => Math.round(v)
  }
}));

// rentalSchema.statics.lookup = function(customerId, movieId) {
//   return this.findOne({
//     'customer._id': customerId,
//     'movie._id': movieId,
//   });
// }

// rentalSchema.methods.return = function() {
//   this.dateReturned = new Date();

//   const rentalDays = moment().diff(this.dateOut, 'days');
//   this.rentalFee = rentalDays * this.movie.dailyRentalRate;
// }

// const Rental = mongoose.model('Rental', rentalSchema);

function validateRental(rental) {
  const schema = {
    customerId: Joi.objectId().max(63).required(),
    movieId: Joi.objectId().max(63).required()
  };

  return Joi.validate(rental, schema);
}

exports.Rental = Rental;
exports.validate = validateRental;
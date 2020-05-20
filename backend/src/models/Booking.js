const { Schema, model } = require('mongoose');

const BookingSchema = new Schema({
  date: String,
  approved: Boolean,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  spot: {
    type: Schema.Types.ObjectId,
    ref: 'Spot'
  }
});

module.exports = model('Booking', BookingSchema);
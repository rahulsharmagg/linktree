const mongoose = require('mongoose');
const Schema = mongoose.Schema
const orderSchema = new Schema({
  orderId: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  tier: {
    type: String,
    required: true
  },
  customer: {
    type: Schema.Types.ObjectId,
    ref: 'Users'
  },
  transactionId: {
    type: Schema.Types.ObjectId,
    ref: 'Transaction'
  },
});

module.exports = mongoose.model('Order', orderSchema);

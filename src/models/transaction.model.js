const mongoose = require('mongoose');

// Schema for transactions
const transactionSchema = new mongoose.Schema({
  transactionId: {
    type: String,
    required: true
  },
  transactionTimestamp: {
    type: Date,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  gateway: {
    type: String,
    required: true
  },
  reference: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
})

const Transaction = mongoose.model('Transaction', transactionSchema)
module.exports = Transaction

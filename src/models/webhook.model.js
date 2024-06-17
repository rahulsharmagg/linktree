const mongoose = require('mongoose')

const webhookSchema = new mongoose.Schema({
  body: Object,
  createdAt: {
  	type: Date,
    default: Date.now
  }
})

const Webhook = mongoose.model('Webhook', webhookSchema)

module.exports = Webhook

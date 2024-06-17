const mongoose = require('mongoose')
const Schema = mongoose.Schema

const linkSchema = new Schema({
  name: String,
  url: String,
  key: {
    type: Schema.Types.ObjectId,
    ref: 'Collections'
  },
  properties: Object,
  expireAt: Date,
  createdAt: {
    type: Date,
    default: Date.now
  }
})

const Link = mongoose.model('Links', linkSchema)

module.exports = Link

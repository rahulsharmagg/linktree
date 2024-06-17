const mongoose = require('mongoose')
const Schema = mongoose.Schema

const collectionSchema = new Schema({
  name: String,
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'Users'
  },
  live: {
    type: Boolean,
    default: true
  },
  preferences: {
    type: Object,
    default: {
      background: '#FFFFFF',
      foreground: '#2F2E2F',
      font: 'default'
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

const Collection = mongoose.model('Collections', collectionSchema)

module.exports = Collection

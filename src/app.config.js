const express = require('express')
const path = require('path')
const base = require(path.join(__dirname, 'routes', 'base.route'))
const profile = require(path.join(__dirname, 'routes', 'profile.route'))
const webhook = require(path.join(__dirname, 'routes', 'webhook.route'))
const { NotFound, ErrorHandler } = require(path.join(__dirname, 'middlewares', 'error.middleware'))

/**
 * Database Option
 * @type {Object}
 */
const database = {
  // url: 'mongodb://localhost:27017/LinkTree',
  url: 'mongodb+srv://'+ process.env.MONGO_USER +':'+ process.env.MONGO_PASS +'@cluster0.nwgbk2x.mongodb.net/LinkTree?retryWrites=true&w=majority&appName=Cluster0',
}

/**
 * Order Info
 * @type {Object}
 */
const order = {
  prefix: 'ORD',
  length: 10
}

/**
 * Database debuggin
 * @type {Boolean}
 */
const debug = false

/**
 * Base routes for app
 */
const router = express.Router()
router.use('/', base)
router.use('/profile', profile)
router.use('/webhook', webhook)
router.use(NotFound, ErrorHandler)

module.exports = {
  database,
  debug,
  router,
  order
}

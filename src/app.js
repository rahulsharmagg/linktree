const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

// Enviroment Config
dotenv.config()
// App Config
const { database, router, debug } = require('./app.config')

// MongoDB Debug
mongoose.set('debug', debug)

// Create an Express app
const app = express()

// Middleware to parse JSON bodies
app.use(express.json())

// Custom Routes for app
app.use(router)

// Connect to MongoDB
mongoose.connect(database.url)
const db = mongoose.connection

// Check if MongoDB connection is successful
db.on('error', console.error.bind(console, 'MongoDB connection error:'))
db.on('warning', (warning) => {
  console.warn(`Mongoose warning: ${warning}`)
})
db.once('open', () => {
  console.log('\x1b[32m%s\x1b[0m', '[database] Connected to MongoDB!')
})

module.exports = app

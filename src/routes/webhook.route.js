const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const PaymentHook = require('../controllers/webhook.controller')
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))

router.use((req, res, next) => {
  const headers = req.headers
  console.log('Header: ', headers)
  next()
})

router.post('/payment', PaymentHook)

module.exports = router

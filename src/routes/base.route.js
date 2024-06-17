const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const Auth = require('../middlewares/auth.middleware')
const { Register, Login } = require('../controllers/base.controller')
const { Buy, Checkout, CheckoutTest } = require('../controllers/checkout.controller')
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))

router.get('/', (req, res, next) => {
  res.send(`
    <p style="font-family: system-ui, sans-serif;text-align:center;">LinkTree is under maintainance and will be back in few days.</p>
    <a href="https://www.codeblaze.in">Back to main site.</a>
  `)
})

router.get('/buy/:tier', Auth, Buy)
router.get('/checkout', (req, res) => {
  const html = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Payment Gateway Interface</title>
  </head>
  <body class="bg-gray-100 font-base">
    <h1>Link Tree Test Checkout</h1>
    <form action="/checkout" method="post">
      <button type="submit">Checkout</button>
    </form>
  </body>
  </html>
  `
  res.send(html)
})
router.post('/checkout', CheckoutTest)

router.post('/login', Login)
// router.post('/checkout', Checkout)
router.post('/register', Register)

module.exports = router

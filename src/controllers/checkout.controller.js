const axios = require('axios')
const crypto = require('node:crypto')
const Order = require('../models/order.model')
const User = require('../models/user.model')
const Plan = require('../data/plan.defination.json')
const { generateOrderId } = require('../utils/util')

function Buy (req, res, next) {
  const { tier } = req.params
  const { user } = res.locals
  const currentPlan = Plan[tier]
  const amount = currentPlan.price

  res.send(`
    <div style="max-width:300px margin: auto; margin-top: 5rem; padding: 10px; background-color:#8af122; font-family:'Roboto', sans-serif;">
      You are purchasing ${tier}<br>
      Total Amount: ${amount}<br>
      Billing: ${user.name}, ${user.email}
    </div>
    <form action="/checkout" method="post">
      <input type="hidden" name="tier" value="${tier}">
      <input type="hidden" name="amount" value="${amount}">
      <input type="hidden" name="customer" value="${user.email}">
      <button type="submit">Checkout</button>
    </form>
  `)
}

async function Checkout (req, res) {
  try {
    const { tier, amount, customer } = req.body
    const paymentGatewayURI = process.env.PAYMENT_GATEWAY_URI
    const user = await User.findOne({ email: customer })
    const order = new Order({
      orderId: generateOrderId(),
      amount,
      tier,
      customer: user._id
    })
    const result = await order.save()
    const { orderId } = result
    const { data: apiRes } = await axios.post(paymentGatewayURI, {
      order: orderId,
      amount,
      customer
    })
    console.log('Response From Gateway: ', apiRes)
    if (apiRes.redirect) {
      res.redirect(apiRes.redirect)
    }
  } catch (error) {
    res.status(500).send(error.message)
  }
}

async function CheckoutTest (req, res, next) {
  try {
    const data = JSON.stringify({
      customer: {
        name: 'Rahul Sharma',
        email: 'rahul@gmail.com'
      },
      order: {
        id: generateOrderId(),
        items: [
          {
            name: 'LINKTREE TIER-1',
            amount: '2.00'
          },
          {
            name: 'LINKTREE TIER 2',
            amount: '6.00'
          }
        ]
      },
      amount: '8.00',
      currency: 'INR',
      reference: 'TIER-1'
    })

    const hmac = crypto.createHmac('sha256', process.env.PAYMENT_API_SECRET)
    hmac.update(data)
    const signature = hmac.digest('hex')

    const config = {
      method: 'post',
      maxBodyLength: Number.POSITIVE_INFINITY,
      url: 'http://localhost:5689/api/payment',
      headers: {
        'x-api-key': process.env.PAYMENT_API_KEY,
        'x-signature': signature,
        'Content-Type': 'application/json'
      },
      data
    }

    axios.request(config)
      .then((response) => {
        console.log(response.data)
        res.redirect(response.data.result.url.replace('localhost', '192.168.29.21'))
      }).catch((error) => {
        console.log(error.data)
      })
  } catch (e) {
    // statements
    console.log(e)
  }
}

module.exports.Buy = Buy
module.exports.Checkout = Checkout
module.exports.CheckoutTest = CheckoutTest

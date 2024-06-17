const Webhook = require('../models/webhook.model')
const crypto = require('node:crypto')

const PaymentHook = (req, res, next) => {
  console.log('Body: ', req.body)
  const data = JSON.stringify(req.body)
  console.log("Signature Data:", data)
  const __sign = req.headers['x-pgi-signature']
  // eslint-disable-next-line camelcase
  const __sign_out = crypto.createHmac('sha256', process.env.HOOK_SECRET).update(data).digest('hex')
  console.log(__sign, __sign_out)
  // eslint-disable-next-line camelcase
  console.log(__sign === __sign_out)
  const webhook = new Webhook()
  webhook.set('body', req.body)
  webhook.save()
  res.status(200).send('ok')
}

module.exports = PaymentHook

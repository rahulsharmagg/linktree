const JWT = require('jsonwebtoken')
const User = require('../models/user.model')
const planDefination = require('../data/plan.defination.json')

function Register (req, res, next) {
  const { query, body } = req
  const { name, email, password, plan } = body

  const currentPlan = planDefination.hasOwnProperty(plan) ? plan : undefined
  const user = new User({
    name, email, password, currentPlan
  })
  user.save().then((result) => {
    console.log(result)
    console.log('New user saved')
    res.redirect('/login?q=register+success')
  }).catch((error) => {
    return res.status(401).json({
      message: error.message
    })
  })
}

module.exports.Register = Register

/* --Login-- */
async function Login (req, res, next) {
  const { email, password } = req.body
  const query = req.query
  try {
    if (!(email && password)) throw Error('invalid login credentials')
    const user = await User.login(email, password)
    const JwtSecret = process.env.JWT_SECRET || 'jwtsecret'
    const token = await JWT.sign({ data: { name: user.name, email: user.email } }, JwtSecret, { expiresIn: '1h' })
    const queryParams = new URLSearchParams(query).toString()
    res.status(200).json({
      type: 'success',
      message: 'Login successful.',
      _token: token,
      _next: '/profile' + (queryParams ? '?' + queryParams : '')
    })
  } catch (err) {
    // console.log(err)
    res.status(200).json({ type: 'error', error: { message: err.message, ...err } })
  }
}

module.exports.Login = Login
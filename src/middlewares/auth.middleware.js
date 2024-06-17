const JWT = require('jsonwebtoken')
const User = require('../models/user.model')

const Auth = async (req, res, next) => {
  const token = req.headers?.authorization?.split('Bearer ')[1]
  if (token) {
    try {
      const JwtSecret = process.env.JWT_SECRET || 'jwtsecret'
      JWT.verify(token, JwtSecret, async function (err, decoded) {
        if (err) {
          console.error('Error in JWT verification:', err)
          return res.sendStatus(401)
        }
        try {
          const user = await User.findByEmail(decoded.data.email)
          if (!user) {
            console.error('User not found')
            return res.sendStatus(401)
          }
          res.locals = { user, decoded }
          next()
        } catch (err) {
          console.error('Error in finding user:', err)
          return res.sendStatus(401)
        }
      })
    } catch (e) {
      console.error('Error in authentication:', e)
      res.sendStatus(401)
    }
  } else {
    res.sendStatus(401)
  }
}

module.exports = Auth

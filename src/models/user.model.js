const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
// Email Validation
function validateEmail (email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Define user schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: validateEmail,
      message: 'Invalid email format'
    }
  },
  password: {
    type: String,
    required: true
  },
  currentPlan: {
    type: String,
    required: true,
    default: 'FREE'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next()
  }
  try {
    const hashedPassword = await bcrypt.hash(this.password, 10)
    this.password = hashedPassword
    next()
  } catch (error) {
    next(error)
  }
})

userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email })
  let err
  if (user) {
    const auth = await bcrypt.compare(password, user.password)
    if (auth) {
      return user
    }
    err = new Error('incorrect password')
    err.key = 'password'
    err._message = 'incorrect password'
    throw err
  }
  err = new Error('incorrect email')
  err.key = 'email'
  // err.message = 'incorrect email'
  throw err
}

userSchema.statics.findByEmail = async function (email) {
  const user = await this.findOne({ email })
  if (user) {
    return user
  }
  throw Error("user not found")
}

// Create User model
const User = mongoose.model('User', userSchema)

module.exports = User

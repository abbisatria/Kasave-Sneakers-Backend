/* eslint-disable no-useless-catch */
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const HASH_ROUND = 10

const userSchema = mongoose.Schema({
  email: {
    type: String,
    require: [true, 'Email harus diisi']
  },
  name: {
    type: String,
    require: [true, 'Nama harus diisi'],
    maxlength: [225, 'Panjang nama harus antara 3 - 225 karakter'],
    minlength: [3, 'Panjang nama harus antara 3 - 225 karakter']
  },
  username: {
    type: String,
    require: [true, 'Username harus diisi'],
    maxlength: [225, 'Panjang username harus antara 3 - 225 karakter'],
    minlength: [3, 'Panjang username harus antara 3 - 225 karakter']
  },
  password: {
    type: String,
    require: [true, 'Kata sandi harus diisi'],
    maxlength: [225, 'Panjang password maksimal 225 karakter']
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user'
  },
  status: {
    type: String,
    enum: ['Y', 'N'],
    default: 'Y'
  },
  phoneNumber: {
    type: String,
    require: [true, 'Nomor telpon harus diisi'],
    maxlength: [13, 'Panjang nomor telpon harus antara 9 - 13 karakter'],
    minlength: [9, 'Panjang nomor telpon harus antara 9 - 13 karakter']
  }
}, { timestamp: true })

userSchema.path('email').validate(async function (value) {
  try {
    const count = await this.model('User').countDocuments({ email: value })
    return !count
  } catch (err) {
    throw err
  }
}, attr => `${attr.value} sudah terdaftar`)

userSchema.pre('save', function (next) {
  this.password = bcrypt.hashSync(this.password, HASH_ROUND)
  next()
})

module.exports = mongoose.model('User', userSchema)

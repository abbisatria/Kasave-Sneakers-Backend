const mongoose = require('mongoose')

const transactionSchema = mongoose.Schema({
  orderId: {
    type: String,
    default: ''
  },
  historyUser: {
    name: { type: String, require: [true, 'Nama player harus diisi'] },
    phoneNumber: {
      type: Number,
      require: [true, 'Nama akun harus diisi'],
      maxlength: [13, 'Panjang nama harus antara 9 - 13 karakter'],
      minlength: [9, 'Panjang nama harus antara 3 - 225 karakter']
    }
  },
  historyItem: [{
    category: {
      name: { type: String, require: [true, 'Nama kategori harus diisi'] }
    },
    subCategory: {
      name: { type: String, require: [true, 'Nama sub kategori harus diisi'] },
      price: { type: Number, default: 0 }
    },
    treatment: {
      name: { type: String, default: '' },
      price: { type: Number, default: 0 }
    },
    name: { type: String, require: [true, 'Nama item harus diisi'] },
    discount: { type: Number, default: 0 },
    description: { type: String },
    oneDay: { type: Boolean, default: false },
    total: { type: Number }
  }],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  total: {
    type: Number
  },
  paid: {
    type: Number
  },
  change: {
    type: Number
  },
  status: {
    type: String,
    enum: ['pending', 'success', 'failed'],
    default: 'pending'
  }
}, { timestamps: true })

module.exports = mongoose.model('Transaction', transactionSchema)

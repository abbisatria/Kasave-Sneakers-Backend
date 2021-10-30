const mongoose = require('mongoose')

const expenseSchema = mongoose.Schema({
  item: {
    type: String,
    require: [true, 'Item harus diisi'],
    maxlength: [225, 'Panjang item harus antara 3 - 225 karakter'],
    minlength: [3, 'Panjang item harus antara 3 - 225 karakter']
  },
  price: {
    type: Number,
    default: 0
  }
}, { timestamps: true })

module.exports = mongoose.model('Expense', expenseSchema)

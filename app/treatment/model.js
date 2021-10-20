const mongoose = require('mongoose')

const treatmentSchema = mongoose.Schema({
  name: {
    type: String,
    require: [true, 'Nama Treatment harus diisi'],
    maxlength: [225, 'Panjang nama treatment harus antara 3 - 225 karakter'],
    minlength: [3, 'Panjang nama treatment harus antara 3 - 225 karakter']
  },
  price: {
    type: Number,
    default: 0
  }
}, { timestamps: true })

module.exports = mongoose.model('Treatment', treatmentSchema)

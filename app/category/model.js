const mongoose = require('mongoose')

const categorySchema = mongoose.Schema({
  name: {
    type: String,
    require: [true, 'Nama Kategori harus diisi'],
    maxlength: [225, 'Panjang nama kategori harus antara 3 - 225 karakter'],
    minlength: [3, 'Panjang nama kategori harus antara 3 - 225 karakter']
  },
  sub_category: [{
    id: {
      type: mongoose.Types.ObjectId
    },
    name: {
      type: String,
      require: [true, 'Nama Sub Kategori harus diisi']
    },
    price: {
      type: Number,
      default: 0
    }
  }]
}, { timestamps: true })

module.exports = mongoose.model('Category', categorySchema)

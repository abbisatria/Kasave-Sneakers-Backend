const mongoose = require('mongoose')

const employeeSchema = mongoose.Schema({
  name: {
    type: String
  },
  salary: {
    type: String
  },
  age: {
    type: Number
  }
}, { timestamps: true })

module.exports = mongoose.model('Employee', employeeSchema)

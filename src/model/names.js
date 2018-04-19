const mongoose = require('mongoose')

let nameSchema = mongoose.Schema({
  title: String,
  age: Number
})

let name = module.exports = mongoose.model('name', nameSchema)

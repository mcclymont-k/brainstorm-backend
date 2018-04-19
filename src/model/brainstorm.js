const mongoose = require('mongoose')

let brainstormSchema = mongoose.Schema({
  title: String,
  sub: String,
  index: Number,
  subIdeas: []
})

let brainstorm = module.exports = mongoose.model('brainstorm', brainstormSchema)

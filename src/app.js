console.log('Hello Kieran')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')

mongoose.connect('mongodb://guest:guest@ds251849.mlab.com:51849/brainstorm')
let db = mongoose.connection

// Check for database errors
db.on('error', (err) => console.log(err))

// Check for connection
db.once('open', () => console.log("Connected to MongoDB..."))

const app = express()

app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors())


let names = require('./model/names')
let brainstorm = require('./model/brainstorm')

app.get('/names', (req, res) => {
  names.find({}, (err, names) => {
    res.send(names)
  })
})

app.get('/brainstorm', (req, res) => {
  brainstorm.find({}, (err, brainstorm) => {
    res.send(brainstorm)
  })
})

app.post('/brainstorm', (req, res) => {
  let id = req.body._id
  console.log(id)
  let newBrainstorm = new brainstorm(req.body)
  brainstorm.findOne({_id: id}, (err, foundItem) => {
    if (foundItem) {
      foundItem.title = newBrainstorm.title
      foundItem.subIdeas = newBrainstorm.subIdeas
      foundItem.sub = newBrainstorm.sub
      foundItem.index = newBrainstorm.index
      foundItem.save()
    } else {
      newBrainstorm.save()
    }
  })
})

app.post('/names', (req, res) => {
  let id = {_id: req.body.id}
  let newName = new names(req.body)
  console.log(req.body)
  names.findOne({_id: id}, (err, foundItem) => {
    if (foundItem) {
      console.log(foundItem)
      console.log(newName)
      foundItem.age = newName.age
      foundItem.save()
    } else {
      newName.save()
    }
  })
})






app.post('/register', (req, res) => {
  res.send({
    message: 'Hello there, thanks for the email'
  })
})
app.listen(process.env.PORT || 8081)

const express = require('express')

const apiRouter = express.Router()

const User = require('../models/UserSchema.js')


const mongoose = require('mongoose')
const scrub = ({ password, ...user }) => user
if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]
//s
const url =
  `mongodb+srv://fullstack:${password}@cluster0.cuxqo.mongodb.net/SwapStreet-app?retryWrites=true`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })


apiRouter.get('/api/users', (request, response) => {
  User.find({}).then(users => {
    response.json(users)
    console.log(users)
  })
})

apiRouter.delete('/api/users/:id', (request, response) => {
  const id = request.params.id
  User.deleteOne({ _id: id }, function (err) {
    if (err) {
      console.log(err)
    }
    User.find({}).then(users => {
      response.json(users)
      console.log(users)
    })
  });
})

apiRouter.put('/api/users/:id', async (request, response) => {
  const id = request.params.id
  let user = await User.findOne({_id: id})
  if (!user) {
    return res.status(401).json({ error: 'user does not exist' })
  }
  const body = request.body

  user.name = body.name ? body.name : (user.name ? user.name : ""), 
  user.email = body.email ? body.email : (user.email ? user.email : ""),
  user.address = body.address ? body.address : (user.address ? user.address : ""),
  user.about = body.about ? body.about : (user.about ? user.about : ""),
  user.coins = body.coins ? body.coins : (user.coins ? user.coins : 0)

  user.save().then(user => {
    response.status(200).json({ user: scrub(user.toJSON()) })
  })
})

apiRouter.post('/api/login', async (req, res) => {

  console.log("post request initialised")
  const UEmail = req.body.email
  const PWord = req.body.password
  console.log(UEmail, PWord)

  const user = await User.findOne({ email: UEmail, password: PWord })

  if (!user) {
    return res.status(401).json({ error: 'invalid user or password' })
  }
  if (user.password === PWord) {
    console.log('Got User', user)
    return res.status(200).json({ user: scrub(user.toJSON()) })
  }
  else {
    return res.status(401).json({ error: 'invalid user or password' })
  }

})

apiRouter.post('/api/register', async (request, response) => {

  const body = request.body

  if (!body.email || !body.password || !body.address || !body.name) {
    return response.status(400).json({
      error: 'content missing'
    })
  }

  const user = new User({
    name: body.name,
    email: body.email,
    password: body.password,
    address: body.address,
    about: body.about || "",
    coins: 20
  })

  user.save().then(user => {
    return response.status(200).json({ user: scrub(user.toJSON()) })
  })
})


module.exports = apiRouter
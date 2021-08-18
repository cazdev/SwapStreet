const express = require('express')  

const apiRouter = express.Router()

const {UserSchema, User} = require('../models/UserSchema.js')


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

apiRouter.post('/api/login', async (req, res) => {
  
  console.log("post request initialised")
  const UName = req.body.username
  const PWord = req.body.password
  console.log(UName, PWord)

  const user = await User.findOne({ username: UName, password:PWord })

  if(!user) {
    return res.status(401).json({ error: 'invalid user or password' })
  }
  if(user.password === PWord) {
    console.log('Got User', user)
    return res.status(200).json({ user: scrub(user.toJSON()) })
  }
  else {
    return res.status(401).json({ error: 'invalid user or password' })
  }
  
})
module.exports = apiRouter
require('dotenv').config()
const express = require('express') 
const cors = require('cors')
 
const apiRouter = require("./controllers/api")

const app = express() 
app.use(cors())
app.use(express.json()) 
app.use(express.static('build'))
app.use(apiRouter)
var fs = require('fs')
var dir = './public/avatars'

if(!fs.existsSync(dir)) {
  fs.mkdirSync(dir)
}

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
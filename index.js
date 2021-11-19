//const http = require('http')
//const express = require('express')
//require('dotenv').config()
//const app = express()
//const cors = require('cors')
//app.use(cors())
//app.use(express.json())
//const mongoose = require('mongoose')
const app = require('./app')
const config = require('./utils/config')
const logger = require('./utils/logger')

/*const mongoUrl = process.env.MONGODB_URI
console.log('connecting to', mongoUrl)
mongoose.connect(mongoUrl)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const Blog = mongoose.model('Blog', blogSchema)

app.use(cors())
app.use(express.json())
*/

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

require('dotenv').config()

const PORT = process.env.PORT

const MONGODB_URI = process.env.NODE_ENV === 'test'
  ? process.env.TEST_MONGODB_URI
  : process.env.MONGODB_URI

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}

module.exports = {
  MONGODB_URI,
  PORT,
  options
}
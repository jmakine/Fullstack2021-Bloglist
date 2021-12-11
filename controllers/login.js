const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
  const body = request.body
  console.log('request.body:')
  console.log(body)

  const user = await User.findOne({ username: body.username })
  console.log('user: ' + user)
  console.log('user.passwordHash: ' + user.passwordHash)

  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(body.password, user.passwordHash)
  console.log('passwordCorrect: ' + passwordCorrect)

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'Invalid username or password'
    })
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  }
  console.log(userForToken)

  // token expires in 60*60 seconds, that is, in one hour
  const token = jwt.sign(
    userForToken, 
    process.env.SECRET,
    { expiresIn: 60*60 }
  )

  response
    .status(200)
    .send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter
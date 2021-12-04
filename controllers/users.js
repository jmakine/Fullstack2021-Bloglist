const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  try {
  const body = request.body

  if(!body.username) {
      return response.status(400).json({error: 'Missing username'})
  }

  if(body.username.length < 3) {
      return response.status(400).json({error: 'Username has to be at least 3 characters long'})
  }

  const alreadyExistingUsername = await User.findOne({username: body.username})
  if (alreadyExistingUsername) {
      return response.status(400).json(({error: 'Username already exists'}))
  }

  if(!body.password) {
    return response.status(400).json({error: 'Missing password'})
  }

  if(!body.password.length < 3) {
    return response.status(400).json({error: 'Password has to be at least 3 characters long'})
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.json(savedUser)

  } catch(error) {
    return response.status(500).send({ error: "Internal Server Error"})
  }

})

usersRouter.get('/', async (request, response) => {
    const users = await User.find({})
    response.json(users.map(u => u.toJSON()))
})

module.exports = usersRouter
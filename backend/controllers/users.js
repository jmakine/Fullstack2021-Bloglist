const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {

  const body = request.body
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

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

  if(body.password.length < 3) {
    return response.status(400).json({error: 'Password has to be at least 3 characters long'})
  }

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash
  })

  const savedUser = await user.save()
  response.json(savedUser)
})

usersRouter.get('/', async (request, response) => {
    const users = await User
        .find({})
        .populate('blogs', {title: 1, author: 1, url: 1, likes: 1})
    response.json(users.map(user => user.toJSON()))
})

usersRouter.get('/:id', async(request, response) => {
  const user = await User.findById(request.params.id)
  if (user) {
    response.json(user.toJSON())
  } else {
    response.status(404).end()
  }
})

usersRouter.delete('/:id', async(request, response) => {
    await User.findByIdAndRemove(request.params.id)
    response.status(204).end()
  })

module.exports = usersRouter
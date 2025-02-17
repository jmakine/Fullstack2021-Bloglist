const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

const tokenError = (response) => {
  response.status(401).json({ error: 'Token missing or invalid' })
}

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 })
  response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    tokenError(response)
  }

  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.json(savedBlog.toJSON())
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog.toJSON())
  } else {
    response.status(404).end()
  }
})

blogsRouter.delete('/:id', async(request, response) => {
  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  const blog = await Blog.findById(request.params.id)

  if (!decodedToken.id || !token) {
    tokenError()
  }

  if (blog.user.toString() !== decodedToken.id.toString()){
    return response
      .status(401)
      .json({ error: 'Blog can only be removed by the user who added it' })
  }
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request,response) => {
  const body = request.body

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, body, { new: true }).populate('user', { username: 1, name: 1 })
  response.json(updatedBlog.toJSON())
})

blogsRouter.post('/:id/comments', async (request, response) => {
  const blog = await (await Blog.findById(request.params.id)).populate('user', { username: 1, name: 1 })
  blog.comments = blog.comments.concat(request.body)
  blog.save()
  response.status(201).json(blog)
})

module.exports = blogsRouter
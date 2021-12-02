const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

  blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs.map(blog => blog.toJSON()))     
  })
  
  blogsRouter.post('/', async (request, response) => {
    const body = request.body
    
    const newBlog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes
    })
  
    const savedBlog = await newBlog.save()
    response.json(savedBlog.toJSON())
  })
  
module.exports = blogsRouter
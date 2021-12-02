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

  blogsRouter.delete('/:id', async(request, response) => {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  })

  blogsRouter.put('/:id', async (request,response)=>{
    const body = request.body
    
    const updatedBlog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes
    }

    await Blog.findByIdAndUpdate(request.params.id, updatedBlog)
      .then(updatedBlog => {
        response.json(updatedBlog.toJSON())
      })
  })
  
module.exports = blogsRouter
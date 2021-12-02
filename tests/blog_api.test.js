const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

describe('get blogs', () => {

  beforeEach(async () => {    
    await Blog.deleteMany({}) 
    await Blog.insertMany(helper.initialBlogs)
  })

  test('there are 3 initial blogs', async () => {
      const response = await api.get('/api/blogs')
      expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('blogs are returned as json', async () => {  
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

})

describe('adding a blog', () => {

  test('adding succeeds with valid data', async() => {
    const newBlog = {
        title: "Add new",
        author: "new",
        url: "new",
        likes: 10,
      }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAfter = await helper.blogsInDb()
    expect(blogsAfter).toHaveLength(helper.initialBlogs.length + 1)

    const titles = blogsAfter.map(n => n.title)
    expect(titles).toContain('Add new')
  })

})

afterAll(async () => {
  await mongoose.connection.close()
})
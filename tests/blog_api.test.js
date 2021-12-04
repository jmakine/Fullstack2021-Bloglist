const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')

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

describe('when there is initially one user at db', () => {
  
  beforeEach(async () => {
    await User.deleteMany({})
    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })
    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'jenska',
      name: 'Jenni Mäkinen',
      password: 'password123',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAfter = await helper.usersInDb()
    expect(usersAfter).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAfter.map(user => user.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')

    const usersAfter = await helper.usersInDb()
    expect(usersAfter).toHaveLength(usersAtStart.length)
  })

})

afterAll(async () => {
  await mongoose.connection.close()
})
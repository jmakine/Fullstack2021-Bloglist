const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
let token

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogs = helper.initialBlogs.map(blog => new Blog(blog))
  const saveBlogs = blogs.map(blog => blog.save())
  await Promise.all(saveBlogs)

  await User.deleteMany({})
  const passwordHash = await bcrypt.hash('testPassword', 10)
  const user = new User({
    username: 'testUser',
    name: 'testName',
    passwordHash
  })
  await user.save()
  const response = await api
    .post('/api/login')
    .send({
      username: 'testUser',
      name: 'testName',
      password: 'testPassword'
    })
  token = response.body.token
}, 20000)

describe('get blogs', () => {

  test('all blogs are returned', async () => {
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

  test('adding succeeds with valid data and authorized user', async() => {
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(helper.blogToBeAdded)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAfterAddition = await helper.blogsInDb()
    expect(blogsAfterAddition).toHaveLength(helper.initialBlogs.length + 1)

    const titles = blogsAfterAddition.map(n => n.title)
    expect(titles).toContain('AddTitle')
  })

})

describe('creating a new user', () => {

  test('creation succeeds with a fresh username', async () => {

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
    expect(usersAfter).toHaveLength(2)

    const usernames = usersAfter.map(user => user.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation of already existing username fails with proper statuscode and message if username already taken', async () => {

    const newUser = {
      username: 'testUser',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('Username already exists')

    const usersAfter = await helper.usersInDb()
    expect(usersAfter).toHaveLength(1)
  })

  test('creation of missing username fails with proper statuscode and message if username already taken', async () => {

    const newUser = {
      username: '',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('Missing username')

    const usersAfter = await helper.usersInDb()
    expect(usersAfter).toHaveLength(1)
  })

  test('creation of missing password fails with proper statuscode and message if username already taken', async () => {

    const newUser = {
      username: 'newUser',
      name: 'Superuser',
      password: '',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('Missing password')

    const usersAfter = await helper.usersInDb()
    expect(usersAfter).toHaveLength(1)
  })

  test('creation of too short username fails with proper statuscode and message if username already taken', async () => {

    const newUser = {
      username: 'xx',
      name: 'Superuser',
      password: 'xxxxx',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('Username has to be at least 3 characters long')

    const usersAfter = await helper.usersInDb()
    expect(usersAfter).toHaveLength(1)
  })

  test('creation of too short password fails with proper statuscode and message if username already taken', async () => {

    const newUser = {
      username: 'xxxx',
      name: 'Superuser',
      password: 'xx',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('Password has to be at least 3 characters long')

    const usersAfter = await helper.usersInDb()
    expect(usersAfter).toHaveLength(1)
  })

})

afterAll(() => mongoose.connection.close())
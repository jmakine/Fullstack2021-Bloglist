const Blog = require('../models/blog')

const initialBlogs = [
    {
    title: "Test 2",
    author: "2",
    url: "2",
    likes: 2,
    },
    {
    title: "Test 3",
    author: "3",
    url: "3",
    likes: 3,
    },
    {
    title: "Test 4",
    author: "3",
    url: "4",
    likes: 4,
    }
]

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
  }

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}

module.exports = {
    initialBlogs,
    blogsInDb,
    usersInDb
}
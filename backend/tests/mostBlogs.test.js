const mostBlogs = require('../utils/mostBlogs')

const blogs = [
  {
    title: 'Test 2',
    author: '2',
    url: '2',
    likes: 2,
  },
  {
    title: 'Test 3',
    author: '3',
    url: '3',
    likes: 3,
  },
  {
    title: 'Test 4',
    author: '3',
    url: '4',
    likes: 4,
  }
]

const empty_list = []

const authorWithMostBlogs = [
  { author: '3',
    blogs: 2 }
]

describe('most blogs', () => {
  test('author "3" has most blogs', () => {
    const result = mostBlogs.mostBlogs(blogs)
    expect(result).toEqual(authorWithMostBlogs)
  })

  test('empty list retuns []', () => {
    const result = mostBlogs.mostBlogs(empty_list)
    expect(result).toEqual([])
  })

})
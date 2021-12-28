const favoriteBlog = require('../utils/favoriteBlog')

describe('favorite', () => {
  test('favorite blog', () => {

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
      }
    ]

    const maxLikesBlog = [{
      title: 'Test 3',
      author: '3',
      url: '3',
      likes: 3,
    }]

    const result = favoriteBlog.favoriteBlog(blogs)
    expect(result).toEqual(maxLikesBlog)
  })
})
const totalLikes = require('../utils/totalLikes')

const blogs_2_and_3 = [
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

const empty_list = []

describe('total likes', () => {
  test('2 + 3 = 5', () => {
    const result = totalLikes.totalLikes(blogs_2_and_3)
    expect(result).toBe(5)
  })

  test('empty list retuns 0', () => {
    const result = totalLikes.totalLikes(empty_list)
    expect(result).toBe(0)
  })

})
const favoriteBlog = (blogs) => {
  const maxLikes = Math.max(...blogs.map(item => item.likes), 0)
  return blogs.filter(item => item.likes === maxLikes)
}

module.exports = {
  favoriteBlog
}
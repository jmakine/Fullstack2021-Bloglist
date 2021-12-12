const totalLikes = (blogs) => {
    if (blogs.length != 0) {
     return blogs
            .map(item => item.likes)
            .reduce((prev, next) => prev + next)
    }
    else return 0
}

module.exports = {
    totalLikes
}
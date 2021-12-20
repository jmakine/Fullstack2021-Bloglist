import React, {useState} from 'react'

const Blog = ({blog, likeBlog, removeBlog, loggedUser}) => {

  const [blogVisible, setBlogVisible] = useState(false)
  let visible = blogVisible ? 'Hide' : 'Show more'

  const blogStyle = {
    paddingTop: 5,
    paddingLeft: 3,
    paddingRight: 3,
    paddingBottom: 5,
    border: 'solid',
    borderWidth: 1
  }

  const deleteButton = () => {
    if (blog.user.username === loggedUser.username) {
      return (
        <button style={{ color: 'red' }} onClick={() => removeBlog(blog)}>Delete</button>
      )
    }
  }

  return (
    <div style={blogStyle}>
      <b>Title: </b> {blog.title} &nbsp; 
      <b>Author: </b> {blog.author} &nbsp;
      <button onClick={() => setBlogVisible(!blogVisible)}>{visible}</button>
      &nbsp;&nbsp;&nbsp; <button style={{color: 'green'}} onClick={() => likeBlog(blog, blog.id)}>Like</button>
      &nbsp;&nbsp;&nbsp; {deleteButton()}
      { blogVisible &&
      <div>
        <b>Url: </b> {blog.url} &nbsp;
        <b>Likes: </b> {blog.likes} &nbsp;
      </div> }
    </div>
  )
}

export default Blog
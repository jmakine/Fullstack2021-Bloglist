import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { likeBlog, deleteBlog, commentBlog, initializeBlogs } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { Button } from 'react-bootstrap'

const Blog = ({blog, user}) => {

  const dispatch = useDispatch()
  const history = useHistory()

  const [newComment, setComment] = useState({
    id: user.id,
    username: user.username,
    comment: ''
  })  

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const like = (blogObject) => {
    dispatch(likeBlog(blogObject))
    dispatch(setNotification(
      `Blog ${blogObject.title} liked!`
    , 5))
  }

  const removeBlog = (blogObject) => {
      if (window.confirm(`Remove "${blogObject.title}" by author "${blogObject.author}" from list`)) {
      dispatch(deleteBlog(blogObject.id))        
      dispatch(setNotification(
        `Blog "${blogObject.title}" by author "${blogObject.author}" deleted`
      , 5))
      history.push('/')            
    }
  }
  
  const deleteButton = () => {
    if (blog.user.username === user.username) {
      return (
        <Button variant="danger" onClick={() => removeBlog(blog)}>Delete</Button>
      )
    }
  }

  const urlPath = (url) => {
    if (String(url).includes('://')) {
      return url
    } else {
      return `https://${url}`
    }
  }

  const addComment = (event) => {
    event.preventDefault()
    dispatch(commentBlog(blog.id, newComment))
    setComment({ ...newComment, comment: ''  })
  }

  return (
    <div>
      <p></p>
      <h2>{blog.title}, by author {blog.author}</h2> 
      <hr></hr>
      <p></p>
        <a style={{display: "table-cell", fontSize: 18}} href={urlPath(blog.url)} target="_blank" rel = "noopener noreferrer"> {blog.url} </a>
        <p></p>

        <p><text style={{fontSize: 18}}> Likes: </text> 
          <text style={{frontSize: 20, fontWeight: "bold"}}>{blog.likes}</text> 
          &nbsp;&nbsp;<Button variant="success" onClick={()=>like(blog)}> Like </Button> </p> 
        <p>Added by user {user.username} &nbsp; {deleteButton()}</p>
        <p></p>
        <h3>Comments</h3>
        <ul>
          {blog.comments.map( (c) => (
            <li>
              {c.comment}
            </li>
          ))}
        </ul>
        <div>
          <form onSubmit={addComment}>
            <input
              id='comment'
              onChange={({ target }) => setComment({ ...newComment, comment: target.value })}
              value={newComment.comment}
            />
            &nbsp;&nbsp;<Button variant="success" type="submit">Add a comment</Button>
          </form>
        </div>
    </div>
  )
}

export default Blog
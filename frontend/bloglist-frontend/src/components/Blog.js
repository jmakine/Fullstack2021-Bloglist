import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { Button } from 'react-bootstrap'

const Blog = ({blog, user}) => {

  const dispatch = useDispatch()
  const history = useHistory()

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

  return (
    <div>
      <p></p>
      <h2>{blog.title}, by author {blog.author}</h2>  
        <p></p>
        <a style={{display: "table-cell"}} href={urlPath(blog.url)} target="_blank" rel = "noopener noreferrer"> {blog.url} </a>
        <p> Likes: {blog.likes} <Button variant="success" onClick={()=>like(blog)}> Like </Button> </p> 
        <p>Added by user {blog.user.username}</p>
        <p>{deleteButton()}</p>
    </div>
  )
}

export default Blog
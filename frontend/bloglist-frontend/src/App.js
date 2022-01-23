import React, { useState, useEffect, useRef } from 'react'

import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

import blogService from './services/blogs'
import loginService from './services/login'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { createBlog, like, initializeBlogs, deleteBlog } from './reducers/blogReducer'

const App = () => {
  
  const blogs = useSelector(state => state.blogs)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  
  const [user, setUser] = useState(null)
  
  const blogFormRef = useRef()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)  
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setUsername('')
      setPassword('')
      dispatch(setNotification('Wrong username or password'), 5)     
    }
  }

  const handleLogout = async (event) => {
    try {
      window.localStorage.removeItem('loggedBlogAppUser')
      setUser(null)
    } catch(expection){
      console.log('error with logout')  
    }
  } 

  const loginForm = () => (
      <Togglable buttonLabel="Log in">
      <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
      </Togglable> 
    )

  const blogsList = () => (
    <div>
      {blogs
        .sort((x, y) => y.likes - x.likes)
        .map(blog =>
          <Blog 
            id='blog'
            key={blog.id} 
            blog={blog} 
            likeBlog={likeBlog} 
            removeBlog={removeBlog}
            loggedUser={user}/>
          )}
    </div>
  )

  const blogForm = () => (
    <Togglable buttonLabel="Add new blog" ref={blogFormRef}>
      <BlogForm createBlog = {addBlog} />
    </Togglable>
  )
  
  const addBlog = async (blogObject) => {
      blogFormRef.current.toggleVisibility()
      dispatch(createBlog(blogObject))
      dispatch(setNotification(
        `Blog "${blogObject.title}" by author "${blogObject.author}" added`
        , 5))
  }

  const likeBlog = async (blogObject) => {
      dispatch(like(blogObject))
      dispatch(setNotification(`Blog ${blogObject.title} liked!`, 5))
  }

  const removeBlog = async (blogObject) => {
        if (window.confirm(`Remove "${blogObject.title}" by author "${blogObject.author}" from list`)) {
        dispatch(deleteBlog(blogObject.id))        
        dispatch(setNotification(`Blog "${blogObject.title}" by author "${blogObject.author}" deleted`, 5))            
      }
  }

  return (
    <div>
      <h1>Blog App</h1>
      <Notification />
      
      {user === null ?
        loginForm() :
        
        <div>
          <p>{user.name} logged in</p>         

          <h2>Blogs</h2>
          {blogsList()}
            
          <p></p>
          {blogForm()}
          
          <button className='logout' onClick={handleLogout}> Log out</button>
        </div>
      }
    </div>
  )
}

export default App
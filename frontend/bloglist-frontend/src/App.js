import React, { useState, useEffect, useRef } from 'react'

import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

import blogService from './services/blogs'
import loginService from './services/login'
import { useDispatch } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'

const App = () => {
  const [blogs, setBlogs] = useState([])
  
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  
  const [user, setUser] = useState(null)
  
  const blogFormRef = useRef()
  const dispatch = useDispatch()

  useEffect(() => {
    blogService.getAllBlogs().then(blogs => {
      setBlogs( blogs )
    })  
  }, [])

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
    <h2>Blogs</h2>
      {blogs
        .sort((x, y) => y.likes - x.likes)
        .map(blog =>
          <Blog 
            id='blog'
            key={blog.id} 
            blog={blog} 
            user={user} 
            likeBlog={likeBlog} 
            removeBlog={removeBlog}
            loggedUser={user}/>
          )}
    </div>
  )
  
  const addBlog = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility()
      const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))
      dispatch(setNotification(
        `Blog "${blogObject.title}" by author "${blogObject.author}" added`
        , 5))
    } catch (exception) {
      dispatch(setNotification(`Error:  ${console.error()}`, 5))
    }
  }

  const likeBlog = async (blogObject, id) => {
    try {
      const likedBlog = {
        user: blogObject.user.id,
        title: blogObject.title,
        author: blogObject.author,
        likes: (blogObject.likes += 1),
      }

      await blogService.update(id, likedBlog)
      dispatch(setNotification(`Blog ${blogObject.title} liked!`, 5))

    } catch (error) {
      console.log(error)
      dispatch(setNotification('Error with trying to like the blog'), 5)
    }
  }

  const removeBlog = async (blog) => {
    try{
      if (window.confirm(`Remove "${blog.title}" by author "${blog.author}" from list`)) {
        await blogService.remove(blog.id, user.token)
        setBlogs(blogs.filter(x => x.id !== blog.id))    
        dispatch(setNotification(`Blog "${blog.title}" by author "${blog.author}" deleted`, 5))
      }
    } catch (error) {
      dispatch(setNotification(`Error with deletion`, 5))
    }
  }

  const blogForm = () => (
    <Togglable buttonLabel="Add new blog" ref={blogFormRef}>
      <BlogForm createBlog = {addBlog} />
    </Togglable>
  )

  return (
    <div>
      <h1>Blog App</h1>
      <Notification />
      
      {user === null ?
        loginForm() :
        
        <div>
          <p>{user.name} logged in</p>
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
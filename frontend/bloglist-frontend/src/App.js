import React, { useState, useEffect, useRef } from 'react'

import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  
  const [user, setUser] = useState(null)
  
  const [errorMessage, setErrorMessage] = useState(null)
  const [message, setMessage] = useState(null)

  const blogFormRef = useRef()

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
      setErrorMessage('Wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      setUsername('')
      setPassword('')
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
      setMessage(`Blog "${blogObject.title}" by author "${blogObject.author}" added`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      
    } catch (exception) {
      setErrorMessage(`Error:  ${console.error()}`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
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
      setMessage(`Blog ${blogObject.title} liked!`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)

    } catch (error) {
      console.log(error)
      setErrorMessage('Error with trying to like the blog')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const removeBlog = async (blog) => {
    try{
      if (window.confirm(`Remove "${blog.title}" by author "${blog.author}" from list`)) {
        await blogService.remove(blog.id, user.token)
        setBlogs(blogs.filter(x => x.id !== blog.id))    
        setMessage(`Blog "${blog.title}" by author "${blog.author}" deleted`)
        setTimeout(() => {
          setMessage(null)
        }, 5000) 
      }
    } catch (error) {
      setErrorMessage(`Error with deletion`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
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
      <Notification errMessage={errorMessage} successMessage={message}/>
      
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
import React, { useState, useEffect } from 'react'

import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [newLikes, setNewLikes] =useState(0)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [message, setMessage] = useState(null)

  const [loginVisible, setLoginVisible] = useState(false)
  const [blogVisible, setBlogVisible] = useState(false)

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

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }
    
    return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={() => setLoginVisible(true)}>Log in</button>
      </div>

      <div style={showWhenVisible}>
      <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
          <button onClick={() => setLoginVisible(false)}>Cancel</button>
        </div>
    </div>     
    )
  }

  const blogsList = () => (
    <div>
    <h2>Blogs</h2>
      {blogs.map(blog =>
      <Blog key={blog.id} blog={blog} user={user} />
      )}
    </div>
  )
  
  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      likes: newLikes,
      user: user,
    }

    try {
    blogService
      .create(blogObject)
        .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setMessage(`Blog "${blogObject.title}" by author "${blogObject.author}" added`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
        setNewTitle('')
        setNewAuthor('')
        setNewUrl('')
        setNewLikes(0)
      })
    } catch (exception) {
      setErrorMessage('Blog already exists')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const blogForm = () => {
    const hideWhenVisible = { display: blogVisible ? 'none' : '' }
    const showWhenVisible = { display: blogVisible ? '' : 'none' }
    
    return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={() => setBlogVisible(true)}>Add new blog</button>
      </div>

      <div style={showWhenVisible}>
      <BlogForm
            title={newTitle}
            author={newAuthor}
            url={newUrl}
            likes={newLikes}
            handleTitleChange={({ target }) => setNewTitle(target.value)}
            handleAuthorChange={({ target }) => setNewAuthor(target.value)}
            handleUrlChange={({ target }) => setNewUrl(target.value)}
            handleSubmit={addBlog}
          />
          <button onClick={() => setBlogVisible(false)}>Cancel</button>
        </div>
    </div>     
    )
  }

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
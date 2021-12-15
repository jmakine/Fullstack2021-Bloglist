import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
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
      setErrorMessage('wrong credentials')
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
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
            <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
            <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form> 
    </div>     
  )

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

    blogService
      .create(blogObject)
        .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setNewTitle('')
        setNewAuthor('')
        setNewUrl('')
        setNewLikes(0)
      })
  }

  const blogForm = () => (
    <form onSubmit={addBlog}>
      
      <div>
      <text>Title: </text>
        <input
        type="text"
        value={newTitle}
        name="title"
        onChange={({ target }) => setNewTitle(target.value)}    
      />  
      </div>
      
      <div> 
      <text>Author: </text>     
      <input  
        type="text"
        value={newAuthor}
        name="author"
        onChange={({ target }) => setNewAuthor(target.value)}
      />
      </div>
      
      <div>
      <text>Url: </text>
      <input
        type="text"
        value={newUrl}
        name="url"
        onChange={({ target }) => setNewUrl(target.value)}
      />
      </div>
      
      <button type="submit">Save</button>
    </form>  
  )

  return (
    <div>
      <h1>Blog App</h1>
      
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
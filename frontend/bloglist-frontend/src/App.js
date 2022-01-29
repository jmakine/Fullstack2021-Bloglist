import React, { useEffect, useRef } from 'react'
import { useRouteMatch, Switch, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import Blog from './components/Blog'
import Blogs from './components/Blogs'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import User from './components/User'
import Users from './components/Users'
import Navigation from './components/Navigation'

import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers, setUser } from './reducers/userReducer'


const App = () => {
  
  const [blogs, users, user] = useSelector(state => [state.blogs, state.users.usersList, state.users.loggedUser])
  const blogFormRef = useRef()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(setUser())
  }, [])

  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])

  const userMatch = useRouteMatch('/users/:id')
  const userInfo = userMatch
    ? users.find(user => user.id === userMatch.params.id)
    : null

  const blogMatch = useRouteMatch('/blogs/:id')
  const blogInfo = blogMatch
    ? blogs.find(blog => blog.id === blogMatch.params.id)
    : null

  if (!user) {
    return (
      <div>
        <LoginForm />
      </div>
    )
  }

  return (
    <div>
      <h1>Blog App</h1>
      <div>
      <Navigation user={user}/>
      </div>
      <div>
      <Notification />
      
      <Switch>
        <Route path='/users/:id'>
          <User user={userInfo}/>
        </Route>

        <Route path='/blogs/:id'>
          <Blog 
            blog={blogInfo}
            user={user}
            />
        </Route>

        <Route path='/users'>
          <Users users={users}/>
        </Route>

        <Route path='/blogs'>
          <Blogs blogFormRef={blogFormRef} />
        </Route>

        <Route path='/'>
          <Blogs blogFormRef={blogFormRef} />
        </Route>         
      </Switch>
      </div>
    </div>          
  )
}

export default App
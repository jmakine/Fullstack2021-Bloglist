import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from '../reducers/userReducer'
import { useHistory } from 'react-router-dom'
import { setNotification } from '../reducers/notificationReducer'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const history = useHistory()

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      await dispatch(loginUser(username, password))
      history.push('/')
      window.location.reload()
    } catch (error) {
      dispatch(setNotification(`Error: ${console.error()}`, 5))
      setUsername('')
      setPassword('')
    }
  }

  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <div>
        Username: &nbsp; 
          <input
            id='username'
            value={username}
            onChange={({target}) => setUsername(target.value)}
          />
        </div>
        <div>
        Password: &nbsp; 
          <input
            id='password'
            type="password"
            value={password}
            onChange={({target}) => setPassword(target.value)}
          />
      </div>
        <button id='login-button' type="submit">Log in</button>
      </form>
    </div>
  )
}

export default LoginForm
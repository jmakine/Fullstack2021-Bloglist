import React from 'react'

const LoginForm = ({
   handleSubmit,
   handleUsernameChange,
   handlePasswordChange,
   username,
   password
  }) => {
  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <div>
        <text>Username: </text>
          <input
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div>
        <text>Password: </text>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
      </div>
        <button type="submit">Log in</button>
      </form>
    </div>
  )
}

export default LoginForm
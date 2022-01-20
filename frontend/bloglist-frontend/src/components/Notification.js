import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notifications)

  return (
    <div>
      {notification}
    </div>
  )}

export default Notification

/*const Notification = ({ errMessage, successMessage }) => {

    const errorStyle = {
        color: 'red',
        background: 'lightgrey',
        fontSize: '20px',
        borderStyle: 'solid',
        borderRadius: '5px',
        padding: '10px',
        marginBottom: '10px'
    }

    const successStyle = {
        color: 'green',
        background: 'lightgrey',
        fontSize: '20px',
        borderStyle: 'solid',
        borderRadius: '5px',
        padding: '10px',
        marginBottom: '10px'
    }

  if (errMessage === null && successMessage === null) {
    return null
  }

  if (errMessage === null && successMessage != null) {
    return (
        <div style={successStyle}>
          {successMessage}
        </div>
      )
    }

  if (errMessage != null && successMessage === null) {
  
    return (
        <div style={errorStyle}>
        {errMessage}
        </div>
        )
    }

}*/
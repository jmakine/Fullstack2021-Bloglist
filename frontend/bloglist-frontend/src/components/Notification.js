import React from 'react'
import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'

const Notification = () => {
  const notification = useSelector(state => state.notification)

  return (
    <Alert variant="light" >
      {notification}
    </Alert>
  )}

export default Notification
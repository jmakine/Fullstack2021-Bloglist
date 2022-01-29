import React from 'react'
import { logoutUser } from '../reducers/userReducer'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Navbar, Nav, Button, Container } from 'react-bootstrap'

const Navigation = ({ user }) => {
    
    const dispatch = useDispatch()
    const history = useHistory()

    const handleLogout = async (event) => {
        event.preventDefault()
        await dispatch(logoutUser())
        history.push('/')
        window.location.reload()
    }

    return (
        <div>
        <Navbar expand="sm" bg="dark" variant="dark">
            <Container fluid>
                <Nav>
                    <Navbar.Brand >Logged in as: {user.username} </Navbar.Brand>                    
                    <Nav.Link href="/blogs">Blogs </Nav.Link>
                    <Nav.Link href="/users">Users </Nav.Link>
                    <Button variant="info" onClick={handleLogout}>Log out</Button>
                </Nav>
            </Container>
        </Navbar>
        </div>
    )
}

export default Navigation
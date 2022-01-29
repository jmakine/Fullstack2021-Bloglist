import React from 'react'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const Users = ({ users }) => {

    if(!users) {
        return null
    }

    return (
        <div>
            <h2>Users</h2>
            <Table bordered>
            <tbody>
            <tr>
                <th> Name </th>
                <th> Blogs added</th>
            </tr>
            {users.map(user => 
                <tr key={user.id}>
                    <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
                    <td>{user.blogs.length}</td>
                </tr>
            )}
            </tbody>
            </Table>
        </div>
    )
}

export default Users
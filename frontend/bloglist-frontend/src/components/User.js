import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const User = ({ user }) => {
    const blogs = useSelector(state => state.blogs)
    if(!user) {
        return null
    }

    if(!user.blogs[0]){
        return <p>User has not added any blogs</p>
    }

    return (
        <div>
            <p></p>
            <h2>User {user.name}</h2>
            <h3>Added blogs</h3>
            <ul>
                {blogs.map(blog =>
                    blog.user.id === user.id
                    ? <li key={blog.id}> 
                        <Link to={`/blogs/${blog.id}`}>
                            {blog.title}
                        </Link>
                    </li>
                    : null
                )}
            </ul>
        </div>
    )
}

export default User
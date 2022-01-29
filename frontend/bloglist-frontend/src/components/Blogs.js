import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import { Table } from 'react-bootstrap'

const Blogs = ({ blogFormRef }) => {

    const blogs = useSelector(state => state.blogs)

    return(
        <div>
            <h2>Blogs</h2>

            <Togglable buttonLabel='Add new blog' ref={blogFormRef}>
                <BlogForm />
            </Togglable>
            
            <Table bordered>
            <tbody>
            <tr>
                <th> Title </th>
                <th> Author </th>
            </tr>
            {blogs
                .sort((x, y) => y.likes - x.likes)
                .map(blog =>                    
                    <tr key={blog.id}>
                        <td>
                            <Link to={`/blogs/${blog.id}`}>
                                {blog.title}
                            </Link>
                        </td>
                        <td>
                            {blog.author}
                        </td>
                    </tr>                    
                )
            }
            </tbody>
            </Table>
        </div>
    )
}

export default Blogs
import React, {useState} from 'react'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'
import { Form, Button } from 'react-bootstrap'

const BlogForm = () => {

    const dispatch = useDispatch()
    const [newTitle, setNewTitle] = useState('')
    const [newAuthor, setNewAuthor] = useState('')
    const [newUrl, setNewUrl] = useState('')
    
    const handleTitleChange = (event) => {
        setNewTitle(event.target.value)
    }
    const handleAuthorChange = (event) => {
        setNewAuthor(event.target.value)
    }
    const handleUrlChange = (event) => {
        setNewUrl(event.target.value)
    }

    const addBlog = (event) => {
        event.preventDefault()
        dispatch(createBlog({
            title: newTitle,
            author: newAuthor,
            url: newUrl,
            likes: 0
            })
        )
        dispatch(setNotification(
            `Blog "${newTitle}" by author "${newAuthor}" added`
        , 5))
        
        setNewTitle('')
        setNewAuthor('')
        setNewUrl('')

    }    
    
        return (
        <div>
        <h3>Add new blog</h3>

        <Form onSubmit={addBlog}>
            <div>
            Title: &nbsp; 
            <input
                id='title'
                value={newTitle}
                onChange={handleTitleChange}
            />
            </div>
            <div>
            Author: &nbsp; 
            <input
                id='author'
                value={newAuthor}
                onChange={handleAuthorChange}
            />
            </div>
            <div>
            Url: &nbsp; 
                <input
                    id='url'
                    value={newUrl}
                    onChange={handleUrlChange}
                />
            </div>
            <p></p>
            <Button variant="success" type="submit">Submit</Button>
            <p></p>
        </Form>
        </div>
        )
    }

export default BlogForm
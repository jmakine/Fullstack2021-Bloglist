import React, {useState} from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'

const BlogForm = ({ createBlog }) => {
    const dispatch = useDispatch()

    const [newTitle, setNewTitle] = useState('')
    const [newAuthor, setNewAuthor] = useState('')
    const [newUrl, setNewUrl] = useState('')
    //const [newLikes, setNewLikes] =useState(0)
    
    const handleTitleChange = (event) => {
        setNewTitle(event.target.value)
    }
    const handleAuthorChange = (event) => {
        setNewAuthor(event.target.value)
    }
    const handleUrlChange = (event) => {
        setNewUrl(event.target.value)
    }

    const addBlog = async (event) => {
        event.preventDefault()
        createBlog({
          title: newTitle,
          author: newAuthor,
          url: newUrl,
          likes: 0
        })

        setNewTitle('')
        setNewAuthor('')
        setNewUrl('')
        //dispatch(setNotification(`Blog "${newTitle}" by author "${newAuthor}" added`, 5))
    }    
    
        return (
        <div>
        <h2>Add new blog</h2>

        <form onSubmit={addBlog}>
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

                <button id='create-blog' type="submit">Submit</button>
        </form>
        </div>
        )
    }

    BlogForm.propTypes = {
        createBlog: PropTypes.func.isRequired
      }

export default BlogForm
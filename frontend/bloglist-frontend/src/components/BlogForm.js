import React, {useState} from 'react'

const BlogForm = ({ createBlog }) => {

    const [newTitle, setNewTitle] = useState('')
    const [newAuthor, setNewAuthor] = useState('')
    const [newUrl, setNewUrl] = useState('')
    const [newLikes, setNewLikes] =useState(0)
    
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
        //event.preventDefault()
        createBlog({
          title: newTitle,
          author: newAuthor,
          url: newUrl,
          likes: newLikes
        })

        setNewTitle('')
        setNewAuthor('')
        setNewUrl('')
        setNewLikes(0)
    }
    
        return (
        <div>
        <h2>Add new blog</h2>

        <form onSubmit={addBlog}>
            <div>
            <text>Title: </text>
            <input
                value={newTitle}
                onChange={handleTitleChange}
            />
            </div>
            <div>
            <text>Author: </text>
            <input
                value={newAuthor}
                onChange={handleAuthorChange}
            />
        </div>
        <div>
        <text>Url: </text>
            <input
                value={newUrl}
                onChange={handleUrlChange}
            />
        </div>

            <button type="submit">Submit</button>
        </form>
        </div>
        )
    }

export default BlogForm
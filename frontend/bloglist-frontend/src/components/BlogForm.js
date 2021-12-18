import React from 'react'

const BlogForm = ({
   handleSubmit,
   handleTitleChange,
   handleAuthorChange,
   handleUrlChange,
   title,
   author,
   url
    }) => {
  
        return (
        <div>
        <h2>Add new blog</h2>

        <form onSubmit={handleSubmit}>
            <div>
            <text>Title: </text>
            <input
                value={title}
                onChange={handleTitleChange}
            />
            </div>
            <div>
            <text>Author: </text>
            <input
                value={author}
                onChange={handleAuthorChange}
            />
        </div>
        <div>
        <text>Url: </text>
            <input
                value={url}
                onChange={handleUrlChange}
            />
        </div>

            <button type="submit">Submit</button>
        </form>
        </div>
        )
    }

export default BlogForm
import React from 'react'
const Blog = ({blog, likeBlog}) => (
  <div>
    <b>Title: </b>
    {blog.title} &nbsp;
    <b>   Author: </b>
    {blog.author} &nbsp;
    <b>   Url: </b>
    {blog.url} &nbsp;
    <b>   Likes: </b>
    {blog.likes} &nbsp;
    <button onClick={() => likeBlog(blog, blog.id)}>Like</button>
  </div>  
)

export default Blog
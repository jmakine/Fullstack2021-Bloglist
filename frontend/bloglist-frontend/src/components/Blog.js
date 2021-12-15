import React from 'react'
const Blog = ({blog}) => (
  <div>
    <b>Title: </b>
    {blog.title} 
    <b>   Author: </b>
    {blog.author}
    <b>   Url: </b>
    {blog.url}
    <b>   Likes: </b>
    {blog.likes}
  </div>  
)

export default Blog
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

test('renders title and author but not url and likes', () => {
  const blog = {
    title: 'Title, rendered',
    author: 'Author, rendered',
    url: 'Url, not rendered by default',
    likes: 'Likes, not rendered by default',
    user: {
        username: 'Test username',
        name: 'Test name',
        id: '123456789'
    },
    id: '123456789'
  }

  const component = render(
    <Blog blog={blog} loggedUser={blog.user}/>
  )

  expect(component.container).toHaveTextContent(
    'Title, rendered'
  )
  expect(component.container).toHaveTextContent(
    'Author, rendered'
  )
  expect(component.container).not.toHaveTextContent(
    'Url, not rendered by default'
  )
  expect(component.container).not.toHaveTextContent(
    'Likes, not rendered by default'
  )
})
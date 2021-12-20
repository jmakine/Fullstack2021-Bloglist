import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {

let component
let mockHandler

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

beforeEach(() => {
    mockHandler = jest.fn()
    component = render(
        <Blog blog={blog} loggedUser={blog.user} likeBlog={mockHandler} />
      )
})

test('By deafult: renders title and author but not url and likes', () => {

  expect(component.container).toHaveTextContent('Title, rendered')
  expect(component.container).toHaveTextContent('Author, rendered')
  expect(component.container).not.toHaveTextContent('Url, not rendered by default')
  expect(component.container).not.toHaveTextContent('Likes, not rendered by default')
})

test('Url and likes are shown only when "Show more" button is cliked', () => {
    const showMoreButton = component.getByText('Show more')
    fireEvent.click(showMoreButton)
    expect(showMoreButton).toHaveTextContent('Hide')
    expect(component.container).toHaveTextContent('Url, not rendered by defaul')
    expect(component.container).toHaveTextContent('Likes, not rendered by defaul')
})

})
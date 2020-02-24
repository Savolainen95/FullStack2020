import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('Blog tests', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Mikko Savolainen',
    url: 'adasdadasdasd',
    likes: 40,
    user: { username: 'savukka' }
  }
  const user = {
    username: 'savukka'
  }

  test('renders content before click', () => {
    const component = render(
      <Blog blog={blog} user={user} />
    )

    const button = component.getByText('view')
    fireEvent.click(button)

    expect(component.container.querySelector('.unformal')).toHaveTextContent(
      'Component testing is done with react-testing-library, Mikko Savolainen'
    )
    expect(component.container.querySelector('.unformal')).not.toHaveTextContent(
      'adasdadasdasd'
    )
  })
  test('renders content after click', () => {

    const mockHandler = jest.fn()

    const component = render(
      <Blog blog={blog} user={user} />
    )

    expect(component.container.querySelector('.formal')).toHaveStyle('display: none')

    const button = component.getByText('view')
    fireEvent.click(button)


    expect(component.container.querySelector('.formal')).toHaveTextContent(
      'adasdadasdasd'
    )
    expect(component.container.querySelector('.formal')).toHaveTextContent('40')
    expect(component.container.querySelector('.formal')).not.toHaveStyle('display: none')
  })
  test('likes pressed twice', () => {
    const mockHandler = jest.fn()

    const component = render(
      <Blog blog={blog} user={user} handleLike={mockHandler} />
    )

    const button = component.getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)

    expect(mockHandler.mock.calls.length).toBe(2)
  })
})

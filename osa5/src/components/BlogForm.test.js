import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

describe('BlogForm tests', () => {
    test('from palautus', () => {
        const handleBlog = jest.fn()

        const component = render(
            <BlogForm handleBlog={handleBlog} />
        )

        const input = component.container.querySelector('input')
        const form = component.container.querySelector('form')

        fireEvent.change(input, {
            target: { value: 'testing of forms could be easier' }
        })

        fireEvent.submit(form)

        expect(createNote.mock.calls.length).toBe(1)
        expect(createNote.mock.calls[0][0].content).toBe('testing of forms could be easier')

        expect(true)
    })
})
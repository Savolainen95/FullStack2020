import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import {setMessage, hideMessage} from '../reducers/notifactionReducer'
import anecdoteService from '../services/anecdotes'


const AnecdoteForm = (event) => {
    const dispatch = useDispatch()

    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''

        dispatch(createAnecdote(content))
        clearTimeout()
        dispatch(setMessage(`new anecdote: ${content}`))
        setTimeout(() => {
            dispatch(hideMessage())
        }, 5000)
    }


    return (
        <div>
            <h2>create new</h2>
            <form onSubmit = {addAnecdote}>
                <div><input name='anecdote' /></div>
                <button type='submit'>create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm
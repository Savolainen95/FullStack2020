import React from 'react'
import { vote } from '../reducers/anecdoteReducer'
import { useSelector, useDispatch } from 'react-redux'
import { setMessage, hideMessage } from '../reducers/notifactionReducer'



const AnecdoteList = () => {
    const dispatch = useDispatch()

    const anecdotes = useSelector(({ filter, anecdotes }) => {
        return anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
    })


    const voter = (anecdote) => {
        dispatch(vote(anecdote))
        dispatch(setMessage(`you voted ${anecdote.content}`))
        setTimeout(() => {
            dispatch(hideMessage())
        }, 5000)
    }

    return (
        <>
            {anecdotes.sort((a,b) => b.votes - a.votes).map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => voter(anecdote)}>vote</button>
                    </div>
                </div>
            )}
        </>
    )
}

export default AnecdoteList
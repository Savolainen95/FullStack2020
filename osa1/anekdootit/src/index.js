import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Header = () => {
    return (
        <h1>Anecdote of the day</h1>
    )
}

const Anecdote = (props) => {
    return (
        <div>
            <div>
                {props.anecdote}
            </div>
            <div>
                has {props.points} votes.
            </div>
        </div>
    )
}

const Favorite = (props) => {
    var maxVotes = 0
    var index = 0
    for (let i = 0; i < props.anecdotes.length; i++) {
        if (props.anecdotes[i].votes > maxVotes) {
            maxVotes = props.anecdotes[i].votes
            index = i
        }
    }
    return (
        <div>
            <h1>Anecdote with most votes</h1>
            <div>
                {props.anecdotes[index].anecdote}
            </div>
            <div>
                has {props.anecdotes[index].votes} votes
            </div>
        </div>
    )
}

const Button = (props) => {
    return ( 
            <button onClick={() => props.onClick(Math.floor(Math.random()*props.anecdotes.length))}>
                {props.text}
            </button>
    )
}

const Vote = (props) => {
    return (
        <button onClick={() => props.onClick(props.anecdotes[props.selected].votes += 1)}>
            {props.text}
        </button>
    )
}

const App = (props) => {
    const [selected, setSelected] = useState(0)
    const [points, setPoints] = useState(0)

    return (
        <div>
            <Header/>
            <Anecdote anecdote={props.anecdotes[selected].anecdote} points = {props.anecdotes[selected].votes}/>
            <Vote text= 'vote'  anecdotes={props.anecdotes} selected = {selected} onClick={setPoints}/>
            <Button text= 'new anecdote' anecdotes={props.anecdotes} onClick={setSelected}/>
            <Favorite selected={selected} points={points} anecdotes= {anecdotes}/>
        </div>
    )
}

const anecdotes = [
    { anecdote: 'If it hurts, do it more often', votes: 0 },
    { anecdote: 'Adding manpower to a late software project makes it later!', votes: 0 },
    { anecdote: 'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.', votes: 0 },
    { anecdote: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.', votes: 0 },
    { anecdote: 'Premature optimization is the root of all evil.', votes: 0 },
    { anecdote: 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.', votes: 0 }
]

ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
)
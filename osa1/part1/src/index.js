import React from 'react'
import ReactDOM from 'react-dom'

const Hello = (props) => {
    return (
      <div>
        <p>He he {props.name} pieraisi. Hän on {props.age} vanha</p>
      </div>
    )
}
const App = () => {
    console.log('asdfasdf')
    const name = "Mikko"
    const age = 24
    return (
      <div>
      <h1>Greetings</h1>
        <Hello name="Ilmari" age= {12 * 3} />
        <Hello name= {name} age= {age} />
    </div>
    )
}
  
  ReactDOM.render(<App />, document.getElementById('root'))
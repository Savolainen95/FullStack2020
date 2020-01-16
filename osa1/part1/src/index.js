import React, { useState } from 'react' 
import ReactDOM from 'react-dom'

const Hello = ({name, age}) => {

  const bornYear = () => new Date().getFullYear() - age

  return (
    <div>
      <p>He he {name} pieraisi. Hän on {age} vanha</p>
      <p> Hän on luultavasti syntynyt vuonna {bornYear()}</p>
    </div>
  )
}

const Display = (props) => {
  return (
    <div>{props.counter}</div>
  )
}
const LeftRight = (props) => {
  console.log(props.left)
  return (
    <div>
      {props.left} {props.right}
    </div>
  )
}
const Button = (props) => {
  return ( 
    <button onClick= {props.handleClick}>
      {props.text}
    </button>
  )
}

const History = (props) => {
  if (props.allClicks.length === 0) {
    return (
      <div>
        Start using the app by pressing left and right button.
      </div>
    )
  }else {
    return (
      <div>
        Buttons you've pressed so far: {props.allClicks.join(' ')}
      </div>
    )
  }
}

const App = (props) => {
  const [ counter, setCounter ] = useState(0)
  const [clicks, setClicks] = useState({
    left: 0, right: 0
  })
  const [allClicks, setAll] = useState([])

  const increaseByOne = () => setCounter(counter + 1)
  const setToZero = () => setCounter(0) 
  console.log('rendering...', counter)

  const handleLeftClick = () => {
    setAll(allClicks.concat('L'))
    setClicks({...clicks, left: clicks.left +1})
  }
  const handleRightClick = () => {
    setAll(allClicks.concat('R'))
    setClicks({...clicks, right: clicks.right +1})
  }

  const olio = {
    name: 'Mikko',
    age: 24,
  }

  return (
    <div>
      <h1>Greetings</h1>
      <Hello name= {olio.name} age={olio.age}/>
      <Display counter= {counter}/>
      <Button
        handleClick={increaseByOne}
        text= 'lisää'        
      />
      <Button
        handleClick={setToZero}
        text= 'nollaa'        
      />
      <p>
      {clicks.left}
      <button onClick={handleLeftClick}>left</button>
      <button onClick={handleRightClick}>right</button>
      {clicks.right}
      </p>
      <History allClicks={allClicks} />
    </div>
  )
}
  

ReactDOM.render(
  <App />, 
  document.getElementById('root')
)



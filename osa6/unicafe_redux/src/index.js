import React from 'react';
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {
  const good = () => {
    store.dispatch({
      type: 'GOOD'
    })
  }
  const bad = () => {
    store.dispatch({
      type: 'BAD'
    })
  }
  const ok = () => {
    store.dispatch({
      type: 'OK'
    })
  }
  const zero = () => {
    store.dispatch({
      type: 'ZERO'
    })
  }

  const allVotes = store.getState().good + store.getState().ok + store.getState().bad
  const average = (store.getState().good - store.getState().bad) / allVotes * 100 + '%'
  const goodVotes = (store.getState().good / allVotes) * 100 + '%'


  return (
    <div>
      <button onClick={good}>hyvä</button>
      <button onClick={ok}>neutraali</button>
      <button onClick={bad}>huono</button>
      <button onClick={zero}>nollaa tilastot</button>
      <div>hyvä {store.getState().good}</div>
      <div>neutraali {store.getState().ok}</div>
      <div>huono {store.getState().bad}</div>
      {allVotes === 0 ? <div>Ääniä ei viellä annettu</div> :
        <>
          <div>Ääniä yhteensä {allVotes}</div>
          <div>Keskiarvo {average}</div>
          <div>Hyvien osuus {goodVotes}</div>
        </>}
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)
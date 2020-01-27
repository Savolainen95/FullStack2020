import React, { useState, useEffect } from 'react'
import axios from 'axios'
const Header = () => {
  return <h2>Phonebook</h2>
}
const Persons = (props) => {
  return (
    <p>{props.person.name} {props.person.number}</p>
  )
}

const Add = (props) => {
  return (
    <>
      <div>
        <h2>add a new number</h2>
      </div>
      <form>
        <div>
          name: <input
            value={props.newName}
            onChange={props.handleNameChange}
          />
        </div>
        <div>
          number: <input
            value={props.newNumber}
            onChange={props.handleNumberChange}
          />
        </div>
        <div>
          <button type="submit" onClick={props.addName}>Add</button>
        </div>
      </form>
    </>
  )
}
const Filter = (props) => {
  return (
    <>
        filter shown with <input
          value={props.finder}
          onChange={props.handleChange}
        />
    </>
  )
}
const Numbers = (props) => {
  return (
    <>
      <h2>Numbers</h2>
      <div>
        {props.persons.filter(person => person.name.toLowerCase().includes(props.finder.toLowerCase())).map((person, i) =>
          <Persons key={i} person={person} />
        )}
      </div>
    </>
  )
}


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [finder, setNewFinder] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])
  console.log('render', persons.length,'persons')


  const handleChange = (event) => {
    setNewFinder(event.target.value)
  }
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }


  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber
    }
    if (persons.map(x => x.name).includes(newName)) {
      window.alert(`${newName} is alredy added to phonebook`)
      setNewName('')
      setNewNumber('')
    } else if (newName !== '') {
      setPersons(persons.concat(nameObject))
      setNewName('')
      setNewNumber('')
    } else {
      window.alert(`Default input is not allowed.`)
      setNewName('')
      setNewNumber('')
    }
  }

  return (
    <div>
      <Header />
      <Filter 
        finder={finder}
        handleChange={handleChange}
      />
      <Add
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
        addName={addName}
      />
      <Numbers 
        persons= {persons}
        finder= {finder}
      />
    </div>
  )

}

export default App
import React, { useState, useEffect } from 'react'
import personService from './services/persons'

const Header = () => {
  return <h2>Phonebook</h2>
}

const Persons = (props) => {
  return (
    <p>
      {props.person.name} {props.person.number}
      <Remove person={props.person} onClick={props.removeName} />
    </p>

  )
}

const Remove = ({ person, onClick }) => {
  return (
    <>
      <button onClick={() => onClick(person)}>Poista</button>
    </>
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
const Numbers = ({ persons, finder, removeName }) => {
  return (
    <>
      <h2>Numbers</h2>
      <div>
        {persons.filter(person => person.name.toLowerCase().includes(finder.toLowerCase())).map((person, i) =>
          <Persons key={i} person={person} removeName={removeName} />
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
    personService
      .getAll()
      .then(response => {
        setPersons(response)
      })
  }, [])


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
      if(window.confirm(`${newName} is alredy added to phonebook, replace older number with new one?`)) {
        const nameObject = {
          name: newName,
          number: newNumber
        }
        const person = persons.find(x => x.name === newName)
        personService
          .update(person.id, nameObject)
          .then(response => {
            setPersons(persons.map(personel => person.id !== personel.id ? personel : response))
          })
      }
      setNewName('')
      setNewNumber('')
    } else if (newName !== '') {
      personService
        .create(nameObject)
        .then(response => {
          setPersons(persons.concat(response))
          setNewName('')
          setNewNumber('')
        })
    } else {
      window.alert(`Default input is not allowed.`)
      setNewName('')
      setNewNumber('')
    }
  }

  const removeName = (person) => {
    if (window.confirm(`Do you want to remove ${person.name}`)) {
      personService.remove(person.id)
      var a = persons
      setPersons(a.filter(x => x.id !== person.id))
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
        persons={persons}
        finder={finder}
        removeName={removeName}
      />
    </div>
  )

}

export default App
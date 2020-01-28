import React, { useState, useEffect } from 'react'
import personService from './services/persons'
import Contents from './contents/Components'




const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [finder, setNewFinder] = useState('')
  const [errorMessage, setErrorMessage] = useState([])

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
      if (window.confirm(`${newName} is alredy added to phonebook, replace older number with new one?`)) {
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
          .catch(error => {
            setErrorMessage(
              [`Person '${newName}' was allredy removed from the server`, "error"]
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })

        if(errorMessage === null) {
          setErrorMessage(
            [`Number of ${person.name} have been updated to ${newNumber}`,"succes"]
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        }
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
      setErrorMessage(
        [`Added ${newName}. num ${newNumber}`,"succes"]
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)

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
      setErrorMessage(
        [`${person.name} is deleted from the list.`, "succes"]
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      setPersons(a.filter(x => x.id !== person.id))

    }
  }

  return (
    <div>
      <Contents
        errorMessage={errorMessage}
        finder={finder}
        handleChange={handleChange}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
        addName={addName}
        persons={persons}
        finder2={finder}
        removeName={removeName}
      />
    </div>
  )

}

export default App
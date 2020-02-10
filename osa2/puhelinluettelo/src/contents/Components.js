import React from 'react'

const Header = ({ message }) => {
    if (message === null) {
      return <h1>Phonebook</h1>
    }
    return (
      <>
        <h1>Phonebook</h1>
        <p className={message[1]}>
          {message[0]}
        </p>
      </>
    )
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

  const Contents = ({
      errorMessage,
      finder, 
      handleChange,
      newName,
      handleNameChange,
      newNumber,
      handleNumberChange,
      addName,
      persons,
      finder2,
      removeName
    }) => {
    return (
        <div>
          <Header message={errorMessage}/>
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
            finder={finder2}
            removeName={removeName}
          />
        </div>
      )
  }
export default Contents
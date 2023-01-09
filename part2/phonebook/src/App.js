import { useState,useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber,setNewNumber] = useState('')
  const [filterName,setFilterName] = useState('')
  const [message,setMessage] = useState([null,null])
  const messageTypes = {message: 'message',error: 'error'}

  useEffect(() => {
    personService.getAll()
      .then( persons => setPersons(persons) )
  }, [])

  const setMessageTimeout = (message,type) => {
    setMessage([message,type])
    setTimeout( () => setMessage([null,null]),5000 )
  }

  const onSubmitHandler = (e) => {

    e.preventDefault()

    const found = persons.find( person => person.name === newName)

    
    const newPerson = {
      name: newName,
      number: newNumber,
      // id: persons.length + 1, get from db if new, else set below if update
    }

    if (found) {

      if (window.confirm(`${newName} is already added to phonebook, replace the old number with the new one?`)) {

        newPerson.id = found.id

        personService.updatePerson(newPerson)
          .then( updated => {
            setPersons( persons.map( p => p.id === updated.id ? updated : p))
            setMessageTimeout( `${newPerson.name} has been updated`,messageTypes.message)
          })
          .catch( err => setMessageTimeout(`Error occurred updating person ${newPerson.name}`,messageTypes.error))
      }
      
    } else {

      personService.addPerson(newPerson)
        .then( person => {
          setPersons([...persons,person])
          setMessageTimeout(`${person.name} has been added`,messageTypes.message)
        })
        .catch( err => setMessageTimeout(`Error occurred while adding person`,messageTypes.error))

    }

    setNewName('')
    setNewNumber('')
  }

  const onDeletePerson = (id,name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService.deletePerson(id)
        .then( res => {
          //console.log('person deleted successfully: ',res)
          setMessageTimeout(`${name} has been deleted`,messageTypes.message)
        })
        .catch( err => setMessageTimeout(`${name} has already been removed from the server`,messageTypes.error))
      
      setPersons(persons.filter( p => p.id !== id )) // this is gonna happen regardless so put it outside personService.deletePerson
    }
  }
 

  const personsToShow = 
    filterName.length > 0 
      ? persons.filter(({name}) => name.toLowerCase().includes(filterName.toLowerCase()))
      : persons;

  return (
    <div>
      <h2>Phonebook</h2>
   
      <Filter filterName={filterName} setFilterName={setFilterName}/>

      <h3>Add a new entry</h3>
      <Notification message={message} />
      <PersonForm 
        newName={newName} 
        setNewName={setNewName} 
        newNumber={newNumber} 
        setNewNumber={setNewNumber} 
        onSubmitHandler={onSubmitHandler}/>
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} onDeletePerson={onDeletePerson} />

    </div>
  )
}

export default App
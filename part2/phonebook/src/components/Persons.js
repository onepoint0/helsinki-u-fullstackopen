const Persons = ({personsToShow,onDeletePerson}) => {
  return (
    <ul>
      { personsToShow.map(person => 
        <li key={person.id}>{person.name} {person.number} {' '}
        <button onClick={() => onDeletePerson(person.id,person.name)}>Delete?</button></li> )
      }
    </ul>
  )
}

export default Persons
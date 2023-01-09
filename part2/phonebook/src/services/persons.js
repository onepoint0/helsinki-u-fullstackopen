import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  return axios.get(baseUrl).then( res => res.data)
}

const addPerson = (newPerson) => {
console.log('adding...',newPerson)
  return axios.post(baseUrl,newPerson).then( res => res.data)
}

const updatePerson = (person) => {
console.log('updating...',person)
  return axios.put(`${baseUrl}/${person.id}`,person).then( res => res.data)
}

const deletePerson = (id) => {
//  console.log('del endpoint ',`${baseUrl}/${id}`)
  return axios.delete(`${baseUrl}/${id}`).then( res => res )
}

export default { getAll, addPerson, deletePerson, updatePerson }

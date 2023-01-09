import { useEffect, useState } from 'react'
import axios from 'axios'
import Countries from './Components/Countries'

function App() {
  const [countries,setCountries] = useState([])
  const [country,setCountry] = useState('')
  const [selected,setSelected] = useState('')

  useEffect(() =>{
    axios
      //.get('https://restcountries.com/v2/all')
      .get('https://restcountries.com/v3.1/all')
      .then( res => { // console.log('res.data countries ',res.data)
        setCountries(res.data)
      })
  },[])

  const onChangeCountry = (e) => {
    setCountry(e.target.value);
    setSelected('')
  }

  const countriesToShow = 
    ( selected.length > 0 && countries.filter( ({name}) => name.official === selected) ) 
    || ( country.length > 0 && countries.filter( ({name}) => name.official.toLowerCase().includes(country.toLowerCase())) )
    || countries

  return (
    <div>

      find countries <input value={country} onChange={(e) => onChangeCountry(e)}/><br/> 

      { countriesToShow.length > 0 && <Countries countries={countriesToShow} setCountry={setSelected}/>}
    </div>
  )
}

export default App

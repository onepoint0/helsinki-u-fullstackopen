import Country from './Country'
import CountryList from './CountryList'

const Countries = ({countries,setCountry}) => {  //console.log('countries', countries)

  if (countries.length > 10) return <p>Too many matches, specify another filter</p>
    
  if (countries.length > 1 && countries.length <= 10) { // return <p>list</p>
   return  <CountryList countries={countries} setCountry={setCountry}/>
  }

  return <Country country={countries[0]} /> 
}
export default Countries;
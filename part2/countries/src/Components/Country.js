import { useEffect,useState } from 'react'
import axios from 'axios'
import Weather from './Weather'

const Country = ({country}) => { // console.log('render country ', country )
  const [weather,setWeather] = useState({})
  const [icon,setIcon] = useState({})
  const api_key = process.env.REACT_APP_API_KEY
  const name = country.name.official

  useEffect(() => {
    const [lat,lon] = country.capitalInfo.latlng
    // console.log(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`)
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`)
      .then( res => { //console.log('weather res.data', res)
        setWeather(res.data)
      })
      .catch( err => `weather not found for ${name}`)
  }, [api_key])

  useEffect(() => { 
    // console.log('ue 2 wether ',weather.name,`https://api.openweathermap.org/data/2.5/find?q=${weather.name}&appid=${api_key}`)
    // console.log('Object.keys(weather).length ', Object.keys(weather).length)
    Object.keys(weather).length > 0 &&
    axios
    .get(`https://api.openweathermap.org/data/2.5/find?q=${weather.name}&appid=${api_key}`)
    .then( res => { //console.log('icon res.data', res.data.list[0].weather[0])
      setIcon(res.data.list[0].weather[0])
    })
  },[weather,api_key]) // console.log('icon',icon)

  return (
    <>
      <h2>{name}</h2>
      <p>capital {country.capital}</p>
      <p>area {country.area}</p>
      <h3>languages</h3>
      <ul>
        {Object.keys(country.languages).map( lang => <li key={lang}>{country.languages[lang]}</li> )}
      </ul>
      <img src={country.flags.png} alt={`Flag of ${name}`} /> 
      { Object.keys(weather).length > 0 
        ? <Weather weather={weather} icon={icon} />
        : <p>Weather is currently unavailable for the capital, {country.capital}</p>
      }
    </>
  );
}
export default Country;
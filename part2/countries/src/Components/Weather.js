const Weather = ({weather,icon}) => { //console.log('weather returned ',icon)
  return (
    <>
      <h2>Weather in {weather.name}</h2>
      <p>temperature {weather.main.temp} celcius</p>
      {Object.keys(icon).length > 0 
        ? <img src={`http://openweathermap.org/img/wn/${icon.icon}@2x.png`} alt={`Weather icon for ${weather.name} - ${icon.description}`}/>
        : <p>Weather icon for {weather.name} currently unavailable :'{'('}</p>}
      <p>wind {weather.wind.speed} m/s</p> 
    </>
  );
}
export default Weather
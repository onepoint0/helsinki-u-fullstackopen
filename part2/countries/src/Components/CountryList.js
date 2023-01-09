const CountryList = ({countries,setCountry}) => { //console.log('countries list ',countries)
  return (
    <>
      {countries.map( ({name,cca2}) => (
        <div key={cca2}>
          {name.official} <button onClick={() => setCountry(name.official)}>Show</button>
        </div>
      ))}
    </>
  )
}
export default CountryList
const Filter = ({filterName,setFilterName}) => <>filter shown with <input value={filterName} onChange={(e) => setFilterName(e.target.value)} /></>

export default Filter
import SearchBar from '../SearchBar/SearchBar'
// import SearchFilters from './SearchFilters/SearchFilters'

const Search = ({ value, setValue, onInputClick, description }) => {
  return (
    <div className='search'>
      {description && <span className='search-description'>{description}</span>}
      <SearchBar
        value={value}
        setValue={setValue}
        onInputClick={onInputClick}
      />
      {/* <SearchFilters /> */}
    </div>
  )
}

export default Search

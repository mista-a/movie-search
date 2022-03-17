import SearchBar from '../SearchBar/SearchBar'
import SearchFilters from './SearchFilters/SearchFilters'

const Search = ({ value, setValue, onInputClick }) => {
  return (
    <div className='search'>
      <SearchBar
        value={value}
        setValue={setValue}
        onInputClick={onInputClick}
      />
      <SearchFilters />
    </div>
  )
}

export default Search

import SearchBar from '../SearchBar/SearchBar'
import SearchFilters from './SearchFilters/SearchFilters'

const Search = ({ onInputClick }) => {
  return (
    <div className='search'>
      <SearchBar onInputClick={onInputClick} />
      <SearchFilters />
    </div>
  )
}

export default Search

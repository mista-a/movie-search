import SearchFiltres from '../../Header/SearchFilters/SearchFiltres'
import SearchBar from '../../SearchBar/SearchBar'

//fix onClickLinkTo={'/search'}

const Search = ({ onInputClick }) => {
  return (
    <div className='search'>
      <SearchBar onInputClick={onInputClick} />
      <SearchFiltres />
    </div>
  )
}

export default Search

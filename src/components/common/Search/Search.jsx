import SearchFiltres from '../../Header/SearchFilters/SearchFiltres'
import SearchBar from '../../SearchBar/SearchBar'

//fix onClickLinkTo={'/search'}

const Search = () => {
  return (
    <div className='search'>
      <SearchBar onClickLinkTo={'/search'} />
      <SearchFiltres />
    </div>
  )
}

export default Search

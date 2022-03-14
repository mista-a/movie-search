import search_bar__cleaner from '../../assets/img/search-cleaner.svg'
import { useRef, memo, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { SearchContext } from '../../contexts/SearchContext'

const SearchBar = memo(({ onClickLinkTo }) => {
  const [searchBarInFocus, setSearchBarInFocus] = useState(false)
  const [searchBarWasInFocus, setSearchBarWasInFocus] = useState(false)

  const { searchQuery, setSearchQuery } = useContext(SearchContext)

  const inputRef = useRef()

  const navigate = useNavigate()

  //fix
  const changeRouteToSearch = () => {
    const path = onClickLinkTo
    navigate(path)
  }

  const onSearchBarInputFocus = () => {
    setSearchBarInFocus(true)
    setSearchBarWasInFocus(true)
  }

  const onSearchBarInputBlur = () => {
    if (searchBarWasInFocus) setSearchBarInFocus(false)
  }

  const onSearchBarChange = (e) => setSearchQuery(e.target.value)

  const cleanSearchBar = (e) => {
    setSearchQuery('')
    e.preventDefault()
    inputRef.current.focus()
  }

  return (
    <div
      className={
        searchBarWasInFocus
          ? searchBarInFocus
            ? 'search-bar search-bar_focus'
            : 'search-bar search-bar_blur'
          : 'search-bar'
      }
    >
      <form className='search-bar__action'>
        <input
          className='search-bar__input'
          onClick={changeRouteToSearch}
          onFocus={onSearchBarInputFocus}
          onBlur={onSearchBarInputBlur}
          onChange={onSearchBarChange}
          ref={inputRef}
          value={searchQuery}
          type='text'
          placeholder='поиск'
        />
        {searchQuery && (
          <button className='search-bar__cleaner' onClick={cleanSearchBar}>
            <img
              className='search-bar__cleaner-img'
              src={search_bar__cleaner}
              alt='clean search'
            />
          </button>
        )}
      </form>
    </div>
  )
})

export default SearchBar

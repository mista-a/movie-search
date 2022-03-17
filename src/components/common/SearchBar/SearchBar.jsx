import search_bar__cleaner from '../../../assets/img/search-cleaner.svg'
import { useRef, memo, useState } from 'react'

const SearchBar = memo(({ setValue, value, onInputClick }) => {
  const [searchBarInFocus, setSearchBarInFocus] = useState(false)
  const [searchBarWasInFocus, setSearchBarWasInFocus] = useState(false)

  const inputRef = useRef()

  const onSearchBarInputFocus = () => {
    setSearchBarInFocus(true)
    setSearchBarWasInFocus(true)
  }

  const onSearchBarInputBlur = () => {
    if (searchBarWasInFocus) setSearchBarInFocus(false)
  }

  const onSearchBarChange = (e) => setValue(e.target.value)

  const cleanSearchBar = (e) => {
    setValue('')
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
          onClick={onInputClick}
          onFocus={onSearchBarInputFocus}
          onBlur={onSearchBarInputBlur}
          onChange={onSearchBarChange}
          ref={inputRef}
          value={value}
          type='text'
          placeholder='поиск'
        />
        {value && (
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

import search_bar__icon from '../../assets/img/search-icon.svg'
import search_bar__cleaner from '../../assets/img/search-cleaner.svg'
import { useRef, memo, useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { SearchContext } from '../../contexts/SearchContext'

//експорт как memoSearchBar ультро не удобен

const SearchBar = ({ setDelayMessage }) => {
  //const [delayMessage, setDelayMessage] = useState('')
  const [searchBarInFocus, setSearchBarInFocus] = useState(false)
  const [searchBarWasInFocus, setSearchBarWasInFocus] = useState(false)

  const { searchQuery, setSearchQuery } = useContext(SearchContext)

  const ref = useRef()

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      setDelayMessage(searchQuery)
    }, 275)
    return () => clearTimeout(timeOutId)
  }, [searchQuery])

  const onSearchBarChange = (e) => setSearchQuery(e.target.value)

  const cleanSearchBar = (e) => {
    setSearchQuery('')
    e.preventDefault()
    ref.current.focus()
  }

  return (
    <Link to='search'>
      <section
        className={
          searchBarWasInFocus
            ? searchBarInFocus
              ? 'search-bar search-bar_focus'
              : 'search-bar search-bar_blur'
            : 'search-bar'
        }
      >
        <form className='search-bar__action'>
          {/* <img
            src={search_bar__icon}
            alt='search icon'
            className='search-bar__icon'
          /> */}
          <input
            className='search-bar__input'
            onFocus={() => {
              setSearchBarInFocus(true)
              setSearchBarWasInFocus(true)
            }}
            onBlur={() => {
              if (searchBarWasInFocus) setSearchBarInFocus(false)
            }}
            onChange={onSearchBarChange}
            ref={ref}
            value={searchQuery}
            type='text'
            placeholder='search'
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
      </section>
    </Link>
  )
}

export const MemoSearchBar = memo(SearchBar)

import search_bar__icon from '../../assets/img/search-icon.svg'
import search_bar__cleaner from '../../assets/img/search-cleaner.svg'
import { useRef, memo, useEffect, useState } from 'react'

const SearchBar = ({ setDelayMessage }) => {
  const [searchQuery, setSearchQuery] = useState('')
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
    <section className='search-bar'>
      <form className='search-bar__action'>
        <img
          src={search_bar__icon}
          alt='search icon'
          className='search-bar__icon'
        />
        <input
          ref={ref}
          value={searchQuery}
          type='text'
          className='search-bar__input'
          onChange={onSearchBarChange}
        />
        <button className='search-bar__cleaner' onClick={cleanSearchBar}>
          <img
            src={search_bar__cleaner}
            alt='clean search'
            className='search-bar__cleaner-img'
          />
        </button>
      </form>
    </section>
  )
}

export const MemoSearchBar = memo(SearchBar)

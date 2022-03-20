import { useContext, useEffect, useState } from 'react'
import { AccountContext } from '../../contexts/AccountContext'
import useDebounce from '../../hooks/useDebounce'
import ContentCard from '../ContentCard/ContentCard'

//fix переделай методы в use effect
//fix добавить debounce

const ProfileContent = ({ searchQuery }) => {
  const [filteredWatchList, setFilteredWatchList] = useState({ results: [] })

  const { watchList } = useContext(AccountContext)

  const filterWatchList = (watchList, searchQuery) => {
    const defaultWatchList = { ...watchList }
    if (!searchQuery) return defaultWatchList

    const filtredTitles = defaultWatchList.results.filter(
      (title) =>
        title.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        title.original_title.toLowerCase().includes(searchQuery.toLowerCase()),
    )

    const filteredDefaultWatchList = { ...defaultWatchList.results }
    filteredDefaultWatchList.results = filtredTitles

    return filteredDefaultWatchList
  }

  useEffect(() => {
    if (watchList) {
      setFilteredWatchList(filterWatchList(watchList, searchQuery))
    }
  }, [searchQuery, watchList])

  return filteredWatchList.results.map((item, index) => {
    return (
      <ContentCard
        key={item.id}
        titleId={item.id}
        poster={item.poster_path}
        titleType={item.media_type}
        name={item.name ? item.name : item.title}
        overview={item.overview}
        releaseDate={
          item.first_air_date ? item.first_air_date : item.release_date
        }
        genersIds={item.genre_ids}
        rating={item.vote_average}
        // ref={index === content.length - 1 ? lastElementRef : null}
      />
    )
  })
}

export default ProfileContent

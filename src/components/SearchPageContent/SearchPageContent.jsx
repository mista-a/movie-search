import { useState, useEffect, useRef, useContext } from 'react'
import { searchAPI } from '../../API/API'
import { LanguageContext } from '../../contexts/LanguageContext'
import { HeaderSearchContext } from '../../contexts/HeaderSearchContext'
import ContentCard from '../ContentCard/ContentCard'
import Preloader from '../common/Preloader/Preloader'
import useObserver from '../../hooks/useObserver'
import { FiltersContext } from '../../contexts/FiltersContext'

//fix переделать подгрузку

const SearchPageContent = () => {
  const [content, setContent] = useState([])
  const [totalPages, setTotalPages] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(false)

  const { language } = useContext(LanguageContext)
  const { delaySearchQuery } = useContext(HeaderSearchContext)
  const { filters, filterByType, filterByReleaseDate } =
    useContext(FiltersContext)

  const lastTitleRef = useRef()

  useObserver(
    lastTitleRef,
    () => setCurrentPage(currentPage + 1),
    currentPage < totalPages,
    [content],
  )

  const filterContent = (content) => {
    const newItemIds = []
    let filteredContent = content.filter((title) => {
      if (
        (!newItemIds.includes(title.id) &&
          title.poster_path &&
          title.media_type !== 'person' &&
          title.release_date) ||
        title.first_air_date
      ) {
        newItemIds.push(title.id)
        return true
      }
    })

    filteredContent = filteredContent.filter((title) =>
      filterByType(title.media_type, filters.type),
    )

    filteredContent = filteredContent.filter((title) =>
      filterByReleaseDate(
        title.release_date
          ? title.release_date.substring(0, 4)
          : title.first_air_date.substring(0, 4),
        filters.startReleaseDate,
        filters.endReleaseDate,
      ),
    )

    return filteredContent
  }

  const changeContent = (content, totalPages) => {
    if (content.total_pages !== totalPages) {
      setTotalPages(content.total_pages)
    }
    const filtedNewContent = filterContent(content.results)
    setContent(filtedNewContent)
  }

  useEffect(() => {
    if (currentPage !== 1) setCurrentPage(1)

    const changeNewContent = async (delaySearchQuery, language) => {
      const newContent = await searchAPI.getContent(
        delaySearchQuery,
        1,
        language,
      )
      changeContent(newContent, totalPages)
    }

    const changeTopTitles = async (currentPage, language) => {
      const newTopTitles = await searchAPI.getTopTitles(currentPage, language)
      changeContent(newTopTitles, totalPages)
    }

    //fix titles? content? я незнаю (замени одно на другое или другое на одно ВО ВСЕМ ПРОЕКТЕ!!!)

    if (delaySearchQuery) {
      changeNewContent(delaySearchQuery, 1, language)
    } else {
      changeTopTitles(1, language)
    }
  }, [delaySearchQuery, filters, language])

  useEffect(() => {
    const addNewContent = async (delaySearchQuery, currentPage, language) => {
      setLoading(true)
      if (currentPage !== 1) {
        const newContent = await searchAPI.getContent(
          delaySearchQuery,
          currentPage,
          language,
        )
        let filtedNewContent = filterContent([
          ...content,
          ...newContent.results,
        ])
        setContent(filtedNewContent)
      }
      setLoading(false)
    }

    const getTopTitles = async (currentPage, language) => {
      setLoading(true)
      if (currentPage !== 1) {
        const newTopTitles = await searchAPI.getTopTitles(currentPage, language)
        const filtedTopTitles = filterContent([
          ...content,
          ...newTopTitles.results,
        ])
        setContent(filtedTopTitles)
      }
      setLoading(false)
    }

    if (delaySearchQuery) {
      addNewContent(delaySearchQuery, currentPage, language)
    } else {
      getTopTitles(currentPage, language)
    }
  }, [currentPage])

  return (
    <div className='content'>
      {content.map((item, index) => {
        return (
          <ContentCard
            key={item.id}
            titleType={item.media_type}
            titleId={item.id}
            poster={item.poster_path}
            name={item.name ? item.name : item.title}
            overview={item.overview}
            releaseDate={
              item.first_air_date ? item.first_air_date : item.release_date
            }
            genersIds={item.genre_ids}
            rating={item.vote_average}
            ref={index === content.length - 1 ? lastTitleRef : null}
          />
        )
      })}
      {loading && <Preloader preloaderClass='content__preloader' />}
      {totalPages === 0 && content.length === 0 && (
        <span className='content__not-found'>Ничего не найдено</span>
      )}
    </div>
  )
}

export default SearchPageContent

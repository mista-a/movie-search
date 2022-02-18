import ProfileContentCard from './ProfileContentCard/ProfileContentCard'
import { listsAPI, profileAPI } from './../../API/API'
import { useState, useEffect, useRef, useCallback, useContext } from 'react'
import { LanguageContext } from '../../contexts/LanguageContext'
import { AccountContext } from '../../contexts/AccountContext'
import { AuthenticationContext } from '../../contexts/AuthenticationContext'

//fix 'Ничего не найдено' вылазит нахуй, когда не надо
//fix переделай методы в use effect
//fix добавить фильтр по ориг назв

const ProfileContent = ({ searchQuery }) => {
  const [content, setContent] = useState([])
  const [totalPages, setTotalPages] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)
  const [watchList, setWatchList] = useState({ results: [] })
  const [filteredWatchList, setFilteredWatchList] = useState({ results: [] })

  const { language } = useContext(LanguageContext)
  const { accountId, accountUsername } = useContext(AccountContext)
  const { sessionId } = useContext(AuthenticationContext)

  const observer = useRef()

  const lastElementRef = useCallback(
    (element) => {
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && currentPage < totalPages) {
          setCurrentPage(currentPage + 1)
        }
      })
      if (element) observer.current.observe(element)
    },
    [content],
  )

  const filterContent = (content) => {
    const newItemIds = []
    return content.filter((item) => {
      if (
        !newItemIds.includes(item.id) &&
        item.poster_path !== null &&
        item.media_type !== 'person'
      ) {
        newItemIds.push(item.id)
        return true
      } else {
        return false
      }
    })
  }

  const filterWatchList = (watchList, searchQuery) => {
    if (!searchQuery) return watchList

    let filtredTitles = watchList.results.filter((title) =>
      title.title.toLowerCase().includes(searchQuery.toLowerCase()),
    )

    watchList.results = filtredTitles

    return watchList
  }

  useEffect(() => {
    if (watchList) {
      setFilteredWatchList(filterWatchList(watchList, searchQuery))
    }
  }, [searchQuery, watchList])

  useEffect(() => {
    const changeNewContent = async (searchQuery, currentPage, language) => {
      if (searchQuery) {
        if (currentPage !== 1) setCurrentPage(1)

        const newContent = await profileAPI.getContent(
          searchQuery,
          currentPage,
          language,
        )
        if (newContent.total_pages !== totalPages) {
          setTotalPages(newContent.total_pages)
        }

        const filtedNewContent = filterContent(newContent.results)
        setContent(filtedNewContent)
      } else if (content.length) {
        setContent([])
      }
    }

    changeNewContent(searchQuery, currentPage, language)
  }, [searchQuery])

  useEffect(() => {
    const addNewContent = async (searchQuery, currentPage, language) => {
      if (currentPage !== 1) {
        const newContent = await profileAPI.getContent(
          searchQuery,
          currentPage,
          language,
        )
        const filtedNewContent = filterContent([
          ...content,
          ...newContent.results,
        ])
        setContent(filtedNewContent)
      }
    }

    addNewContent(searchQuery, currentPage, language)
  }, [currentPage])

  useEffect(() => {
    const getWatchList = async () => {
      const watchList = await listsAPI.getWatchList(
        accountId,
        sessionId,
        language,
        1,
      )

      watchList.results.forEach((title) => {
        title.title ? (title.media_type = 'movie') : (title.media_type = 'tv')
      })

      setWatchList(watchList)
    }
    if (sessionId && language) {
      getWatchList()
    }
  }, [language, sessionId, searchQuery])

  if (searchQuery !== '' && totalPages === 0 && content.length === 0) {
    return <span className='content__not-found'>Ничего не найдено</span>
  } else {
    return (
      <section>
        <div className='content'>
          {filteredWatchList.results.map((item, index) => {
            return (
              <ProfileContentCard
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
                ref={index === content.length - 1 ? lastElementRef : null}
              />
            )
          })}
          <p className='content__text'>{`Фильмы не в списке ${accountUsername}:`}</p>
          {content.map((item, index) => {
            return (
              <ProfileContentCard
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
                ref={index === content.length - 1 ? lastElementRef : null}
              />
            )
          })}
        </div>
      </section>
    )
  }
}

export default ProfileContent

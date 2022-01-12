import ProfileContentCard from './ProfileContentCard/ProfileContentCard'
import { profileAPI } from './../../API/API'
import { useState, useEffect, useRef } from 'react'

const ProfileContent = ({ searchQuery }) => {
  const [content, setContent] = useState([])
  const [totalPages, setTotalPages] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)
  const lastElementRef = useRef()
  const observer = useRef()

  //Создать общий API запрос

  useEffect(() => {
    const loadingPoint = () => {
      if (searchQuery !== '') {
        if (
          lastElementRef.current !== undefined &&
          lastElementRef.current !== null
        ) {
          var callback = function (entries) {
            if (entries[0].isIntersecting && currentPage < totalPages) {
              setCurrentPage(currentPage + 1)
            }
          }
          observer.current = new IntersectionObserver(callback)
          observer.current.observe(lastElementRef.current)
        }
      }
    }

    loadingPoint()
  }, [content])

  useEffect(() => {
    const getTotalPages = async () => {
      if (searchQuery !== '') {
        const newTotalPages = await profileAPI.getTotalPages(searchQuery)
        if (newTotalPages !== totalPages) {
          await setTotalPages(newTotalPages)
        }
      }
    }

    getTotalPages()
  }, [searchQuery])

  useEffect(() => {
    const changeNewContent = async () => {
      if (searchQuery !== '') {
        if (currentPage !== 1) {
          setCurrentPage(1)
        }
        const newContent = await profileAPI.getContent(searchQuery)
        const filtedNewContent = newContent.filter(
          (item) => item.poster_path !== null,
        )
        setContent(filtedNewContent)
      } else {
        setContent([])
      }
    }

    changeNewContent()
  }, [searchQuery])

  useEffect(() => {
    const addNewContent = async () => {
      if (currentPage !== 1) {
        const newContent = await profileAPI.getContent(searchQuery, currentPage)
        const filtedNewContent = newContent.filter(
          (item) => item.poster_path !== null,
        )
        if (filtedNewContent !== content) {
          setContent([...content, ...filtedNewContent])
        }
      }
    }

    addNewContent()
  }, [currentPage])

  //fix
  let id = 0
  //

  console.log(content)

  return (
    <section>
      <div className='content'>
        {content.map((item, index) => {
          return (
            <>
              <ProfileContentCard key={(id += 1)} item={item} />
              {index === content.length - 1 && (
                <div
                  ref={lastElementRef}
                  className='content__loading-point'
                ></div>
              )}
            </>
          )
        })}
      </div>
      {totalPages === 0 && searchQuery !== '' && (
        <span className='content__not-found'>Ничего не найдено</span>
      )}
    </section>
  )
}

export default ProfileContent

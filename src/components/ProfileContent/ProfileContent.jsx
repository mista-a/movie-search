import ProfileContentCard from './ProfileContentCard/ProfileContentCard'
import { profileAPI } from './../../API/API'
import { useState, useEffect, useRef } from 'react'

//fix 'Ничего не найдено' вылазит нахуй, когда ненадо

const ProfileContent = ({ searchQuery }) => {
  const [content, setContent] = useState([])
  const [totalPages, setTotalPages] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)
  const lastElementRef = useRef()
  const observer = useRef()

  const filterContent = (content) => {
    const ids = []
    return content.results.filter((item, index) => {
      if (
        !ids.includes(item.id) &&
        item.poster_path !== null &&
        item.media_type !== 'person'
      ) {
        //  debugger
        ids.push(item.id)
        return true
      } else {
        return false
      }
    })
  }

  useEffect(() => {
    const loadingPoint = () => {
      if (searchQuery !== '') {
        if (
          lastElementRef.current !== undefined &&
          lastElementRef.current !== null
        ) {
          const callback = function (entries) {
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
    const changeNewContent = async () => {
      if (searchQuery !== '') {
        if (currentPage !== 1) {
          setCurrentPage(1)
        }
        const newContent = await profileAPI.getContent(searchQuery)
        if (newContent.total_pages !== totalPages) {
          setTotalPages(newContent.total_pages)
        }
        const filtedNewContent = filterContent(newContent)
        setContent(filtedNewContent)
      } else if (content.length !== 0) {
        setContent([])
      }
    }

    changeNewContent()
  }, [searchQuery])

  useEffect(() => {
    const addNewContent = async () => {
      if (currentPage !== 1) {
        const newContent = await profileAPI.getContent(searchQuery, currentPage)
        const filtedNewContent = filterContent(newContent)
        setContent([...content, ...filtedNewContent])
      }
    }

    addNewContent()
  }, [currentPage])

  console.log(content)

  //fix

  //

  return (
    <section>
      <div className='content'>
        {content.map((item, index) => {
          //if (index === content.length - 1) {
          return (
            <ProfileContentCard
              key={item.id}
              poster={item.poster_path}
              type={item.media_type}
              id={item.id}
              lastElenemt={index === content.length - 1}
              ref={index === content.length - 1 ? lastElementRef : undefined}
            />
          )
        })}
      </div>
      {content.length === 0 && searchQuery !== '' && totalPages === 0 && (
        <span className='content__not-found'>Ничего не найдено</span>
      )}
    </section>
  )
}

export default ProfileContent

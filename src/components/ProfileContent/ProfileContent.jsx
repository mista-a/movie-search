import ProfileContentCard from './ProfileContentCard/ProfileContentCard'
import { profileAPI } from './../../API/API'
import { useState, useEffect, useRef, useCallback } from 'react'

//fix 'Ничего не найдено' вылазит нахуй, когда ненадо

const ProfileContent = ({ searchQuery }) => {
  const [content, setContent] = useState([])
  const [totalPages, setTotalPages] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)
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

  // useEffect(() => {
  //   const loadingPoint = () => {
  //     if (searchQuery !== '') {

  //         lastElementRef.current !== undefined &&
  //         lastElementRef.current !== null
  //       ) {
  //         const callback = function (entries) {
  //           if (entries[0].isIntersecting && currentPage < totalPages) {
  //             setCurrentPage(currentPage + 1)
  //           }
  //         }
  //         observer.current = new IntersectionObserver(callback)
  //         observer.current.observe(lastElementRef.current)
  //       }
  //     }
  //   }

  //   loadingPoint()
  // }, [content])

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
        const filtedNewContent = filterContent(newContent.results)
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
        const filtedNewContent = filterContent([
          ...content,
          ...newContent.results,
        ])
        setContent(filtedNewContent)
      }
    }

    addNewContent()
  }, [currentPage])

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
              ref={index === content.length - 1 ? lastElementRef : null}
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

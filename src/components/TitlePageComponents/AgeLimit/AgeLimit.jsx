import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { titleAPI } from '../../../API/API'

const AgeLimit = () => {
  const [ageLimit, setAgeLimit] = useState({
    id: 0,
    results: [{ release_dates: [{ certification: '0' }] }],
  })

  const { titleType, titleId } = useParams()

  useEffect(() => {
    const getAgeLimit = async () => {
      const ageLimit = await titleAPI.getAgeLimit(titleType, titleId)
      setAgeLimit(ageLimit)
    }

    getAgeLimit()
  }, [titleId, titleType])

  if (!ageLimit.id) return <></>

  return (
    ageLimit.results[0].release_dates[0].certification && (
      <div className='age-limit-container'>
        <b className='age-limit-container__text'>
          {ageLimit.results[0].release_dates[0].certification}+
        </b>
      </div>
    )
  )
}

export default AgeLimit

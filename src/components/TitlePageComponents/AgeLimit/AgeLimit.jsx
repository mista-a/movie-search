import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { titleAPI } from '../../../API/API'

const AgeLimit = () => {
  const { titleType, titleId } = useParams()

  const [ageLimit, setAgeLimit] = useState({
    id: 0,
    results: [{ release_dates: [{ certification: '0' }] }],
  })

  useEffect(() => {
    const getAgeLimit = async () => {
      if (titleType === 'moive') {
        const ageLimit = await titleAPI.getAgeLimit(titleId)
        setAgeLimit(ageLimit)
      } else if (titleType === 'tv') {
        const ageLimit = await titleAPI.getAgeLimit(titleId)
        setAgeLimit(ageLimit)
      }
    }

    getAgeLimit()
  }, [])

  if (ageLimit) {
    return (
      ageLimit &&
      ageLimit.results[0].release_dates[0].certification && (
        <div className='age-limit-container'>
          <b className='age-limit-container__text'>
            {ageLimit.results[0].release_dates[0].certification}
          </b>
        </div>
      )
    )
  } else {
    return ''
  }
}

export default AgeLimit

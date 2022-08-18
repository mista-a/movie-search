import React from 'react'

const PersonFacts = ({ place_of_birth, geneder, birthday, deathday }) => {
  const convertBirthday = new Date(birthday).toLocaleDateString()
  const convertDeathday = deathday
    ? new Date(deathday).toLocaleDateString()
    : null

  const yersOld = deathday
    ? new Date(deathday).getFullYear() - new Date(birthday).getFullYear()
    : new Date().getFullYear() - new Date(birthday).getFullYear()

  return (
    <div className='person-facts'>
      <h2 className='person-facts__header'>О персоне</h2>
      <div className='person-fact-list'>
        <p className='person-fact'>
          <b>Место рождения</b>
          <span>{place_of_birth}</span>
        </p>
        <p className='person-fact'>
          <b>Пол</b>
          <span>{geneder === 1 ? 'Женский' : 'Мужской'}</span>
        </p>
        <p className='person-fact'>
          <b>Дата рождения</b>
          <span>
            {convertBirthday} {!convertDeathday && `(${yersOld})`}
          </span>
        </p>
        {convertDeathday && (
          <p className='person-fact'>
            <b>Дата смерти</b>
            <span>
              {convertDeathday} ({yersOld})
            </span>
          </p>
        )}
      </div>
    </div>
  )
}

export default PersonFacts

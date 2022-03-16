const RealeaseDateFilter = ({ localfilters, changeReleaseDate }) => {
  const changeStartReleaseDate = (e) => {
    if (e.target.value >= 0 && e.target.value.length <= 4) {
      changeReleaseDate('startReleaseDate', e.target.value)
    }
  }
  const changeEndReleaseDate = (e) => {
    if (e.target.value >= 0 && e.target.value.length <= 4) {
      changeReleaseDate('endReleaseDate', e.target.value)
    }
  }

  return (
    <div className='release-date-filter'>
      <div className='release-date-filter-start'>
        <span className='release-date-filter-type release-date-filter-start__text'>
          От
        </span>
        <input
          className='release-date-filter-input start-release-date-input'
          type='number'
          value={localfilters.startReleaseDate}
          onChange={changeStartReleaseDate}
        />
        <span className='release-date-filter-start__year-text'>г.</span>
      </div>
      <div className='release-date-filter-end'>
        <span className='release-date-filter-type release-date-filter-start__text'>
          До
        </span>
        <input
          className='release-date-filter-input release-date-filter-end__input'
          type='number'
          value={localfilters.endReleaseDate}
          onChange={changeEndReleaseDate}
        />
        <span className='release-date-filter-end__year-text'>г.</span>
      </div>
    </div>
  )
}

export default RealeaseDateFilter

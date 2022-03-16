import { useContext, useState } from 'react'
import { FiltersContext } from '../../../../contexts/FiltersContext'
import Modal from '../../Modal/Modal'
import RealeaseDateFilter from './RealeaseDateFilter/RealeaseDateFilter'
import TypeFilter from './TypeFilter/TypeFilter'

const SearchFilters = () => {
  const [SearchFiltersModal, setSearchFiltersModal] = useState(false)
  const [localfilters, setLocalFilters] = useState({
    type: 'multi',
    startReleaseDate: 1,
    endReleaseDate: 2022,
  })

  const toggleSearchFiltersModal = () => {
    setSearchFiltersModal(!SearchFiltersModal)
  }

  const { setFilters } = useContext(FiltersContext)

  const changeLocalFilters = (filter, newParametr) => {
    setLocalFilters({ ...localfilters, [filter]: newParametr })
  }

  const changeFilters = () => {
    setFilters(localfilters)
    toggleSearchFiltersModal()
  }

  return (
    <div className='search-filters'>
      <button
        className='search-filters__button'
        onClick={toggleSearchFiltersModal}
      >
        <span>фильтры</span>
      </button>
      <Modal active={SearchFiltersModal} setActive={setSearchFiltersModal}>
        <TypeFilter
          changeType={changeLocalFilters}
          localfilters={localfilters}
        />
        <RealeaseDateFilter
          changeReleaseDate={changeLocalFilters}
          localfilters={localfilters}
        />
        <button className='' onClick={changeFilters}>
          применить
        </button>
      </Modal>
    </div>
  )
}

export default SearchFilters

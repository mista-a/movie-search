import { useContext, useState } from 'react'
import { FiltresContext } from '../../../contexts/FiltresContext'
import Modal from '../../common/Modal/Modal'
import RealeaseDateFilter from './RealeaseDateFilter/RealeaseDateFilter'
import TypeFilter from './TypeFilter/TypeFilter'

const SearchFiltres = () => {
  const [searchFiltresModal, setSearchFiltresModal] = useState(false)
  const [localfiltres, setLocalFilters] = useState({
    type: 'multi',
    startReleaseDate: 1,
    endReleaseDate: 2022,
  })

  const toggleSearchFiltresModal = () => {
    setSearchFiltresModal(!searchFiltresModal)
  }

  const { setFilters } = useContext(FiltresContext)

  const changeLocalFilters = (filter, newParametr) => {
    setLocalFilters({ ...localfiltres, [filter]: newParametr })
  }

  const changeFilters = () => {
    setFilters(localfiltres)
    toggleSearchFiltresModal()
  }

  return (
    <div className='search-filtres'>
      <button
        className='search-filtres__button'
        onClick={toggleSearchFiltresModal}
      >
        <span>фильтры</span>
      </button>
      <Modal active={searchFiltresModal} setActive={setSearchFiltresModal}>
        <TypeFilter
          changeType={changeLocalFilters}
          localfiltres={localfiltres}
        />
        <RealeaseDateFilter
          changeReleaseDate={changeLocalFilters}
          localfiltres={localfiltres}
        />
        <button className='' onClick={changeFilters}>
          применить
        </button>
      </Modal>
    </div>
  )
}

export default SearchFiltres

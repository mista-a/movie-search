import { useContext, useState } from 'react'
import { FiltresContext } from '../../../contexts/FiltresContext'
import Modal from '../../common/Modal/Modal'
import TypeFilter from './TypeFilter/TypeFilter'

const SearchFiltres = () => {
  const [searchFiltresModal, setSearchFiltresModal] = useState(false)
  const [localfiltres, setLocalFilters] = useState({ type: 'multi' })

  const { setFilters } = useContext(FiltresContext)

  const changeLocalFilters = (filter, newParametr) => {
    setLocalFilters({ ...localfiltres, [filter]: newParametr })
  }

  const changeFilters = () => {
    setFilters(localfiltres)
    setSearchFiltresModal(false)
  }

  return (
    <div className='search-filtres'>
      <button
        className='search-filtres__button'
        onClick={() => setSearchFiltresModal(!searchFiltresModal)}
      >
        <span>фильтры</span>
      </button>
      <Modal active={searchFiltresModal} setActive={setSearchFiltresModal}>
        <TypeFilter
          changeType={changeLocalFilters}
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

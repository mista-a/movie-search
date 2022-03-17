import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { HeaderSearchContext } from '../../../contexts/HeaderSearchContext'
import Search from '../../common/Search/Search'

const HeaderSearch = () => {
  const { searchQuery, setSearchQuery } = useContext(HeaderSearchContext)

  const navigate = useNavigate()

  const changeRouteToSearchPage = () => {
    const path = `search`
    navigate(path)
  }

  return (
    <Search
      onInputClick={changeRouteToSearchPage}
      value={searchQuery}
      setValue={setSearchQuery}
    />
  )
}

export default HeaderSearch

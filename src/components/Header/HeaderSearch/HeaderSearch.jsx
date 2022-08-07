import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { HeaderSearchContext } from '../../../contexts/HeaderSearchContext'
import Search from '../../common/Search/Search'

const HeaderSearch = () => {
  const { searchQuery, setSearchQuery, searchDescription } =
    useContext(HeaderSearchContext)

  const navigate = useNavigate()

  const changeRouteToSearchPage = () => {
    const path = `search`
    navigate(path)
  }

  return (
    <>
      <Search
        value={searchQuery}
        setValue={setSearchQuery}
        description={searchDescription}
        onInputClick={changeRouteToSearchPage}
      />
    </>
  )
}

export default HeaderSearch

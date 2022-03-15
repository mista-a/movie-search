import Search from '../../common/Search/Search'
import { useNavigate } from 'react-router-dom'

const HeaderSearch = () => {
  const navigate = useNavigate()

  const changeRouteToSearchPage = () => {
    const path = `search`
    navigate(path)
  }

  return <Search onInputClick={changeRouteToSearchPage} />
}

export default HeaderSearch

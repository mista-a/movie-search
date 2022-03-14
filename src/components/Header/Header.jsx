import logo from '../../assets/img/logo.svg'
import { memo } from 'react'
import { Link } from 'react-router-dom'
import LanguageSwitcher from './LanguageSwitcher/LanguageSwitcher'
import SearchBar from '../SearchBar/SearchBar'
import ThemeSwitcher from './ThemeSwitcher/ThemeSwitcher'
import LogInController from './LogInController/LogInController'
import SearchFiltres from './SearchFilters/SearchFiltres'
import Search from '../common/Search/Search'

const Header = () => {
  return (
    <header className='header'>
      <Link to='profile' className='logo'>
        <img src={logo} alt='logo' className='logo__image' />
      </Link>
      <Search onClickLinkTo={'/search'} />
      <div className='user-controller'>
        <ThemeSwitcher />
        <LanguageSwitcher />
        <LogInController />
      </div>
    </header>
  )
}

export const MemoHeader = memo(Header)

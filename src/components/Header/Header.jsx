import logo from '../../assets/img/logo.svg'
import { memo } from 'react'
import { Link } from 'react-router-dom'
import LanguageSwitcher from './LanguageSwitcher/LanguageSwitcher'
import ThemeSwitcher from './ThemeSwitcher/ThemeSwitcher'
import LogInController from './LogInController/LogInController'
import HeaderSearch from './HeaderSearch/HeaderSearch'

const Header = () => {
  return (
    <header className='header'>
      <Link to='profile' className='logo'>
        <img src={logo} alt='logo' className='logo__image' />
      </Link>
      <HeaderSearch />
      <div className='user-controller'>
        <ThemeSwitcher />
        <LanguageSwitcher />
        <LogInController />
      </div>
    </header>
  )
}

export const MemoHeader = Header

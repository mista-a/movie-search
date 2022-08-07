import logo from '../../assets/img/logo.svg'
import { Link } from 'react-router-dom'
// import LanguageSwitcher from './LanguageSwitcher/LanguageSwitcher'
import ThemeSwitcher from './ThemeSwitcher/ThemeSwitcher'
// import LogInController from './LogInController/LogInController'
import HeaderSearch from './HeaderSearch/HeaderSearch'

const Header = () => {
  return (
    <header className='header'>
      <Link to='/' className='logo'>
        <img src={logo} alt='logo' className='logo__image' />
      </Link>
      <HeaderSearch />
      <ThemeSwitcher />
      {/* <div className='user-controller'>
        <LanguageSwitcher />
        <LogInController />
      </div> */}
    </header>
  )
}

export default Header

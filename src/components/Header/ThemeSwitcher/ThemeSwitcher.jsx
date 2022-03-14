import { useContext } from 'react'
import { ThemeContext } from '../../../contexts/ThemeContext'
import moon_icon from '../../../assets/img/moon-icon.png'
import useTheme from '../../../hooks/useTheme'
import { useEffect } from 'react'

const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useTheme()

  // const { switchTheme } = useContext(ThemeContext)
  return (
    <div className='theme-switcher'>
      <button className='theme-switcher__button' onClick={toggleTheme}>
        <img
          className='theme-switcher__img'
          src={moon_icon}
          alt='switch theme'
        />
      </button>
    </div>
  )
}

export default ThemeSwitcher

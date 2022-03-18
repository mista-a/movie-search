import moon_icon from '../../../assets/img/moon-icon.png'
import useTheme from '../../../hooks/useTheme'

const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useTheme()

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

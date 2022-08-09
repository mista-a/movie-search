import moonIcon from '../../../assets/img/moon.png'
import sunIcon from '../../../assets/img/sun.png'
import useTheme from '../../../hooks/useTheme'

const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className='theme-switcher'>
      <label className='theme-switcher__label'>
        <input
          className={'theme-switcher__input'}
          type='checkbox'
          onClick={toggleTheme}
        />
        <div className='theme-switcher__toggler'>
          <div
            className={
              theme === 'light'
                ? 'theme-switcher__toggle-button theme-switcher__toggle-button_light'
                : 'theme-switcher__toggle-button theme-switcher__toggle-button_dark'
            }
          ></div>
          <img
            className='theme-switcher__img theme-switcher__moon-img'
            src={moonIcon}
            alt='dark theme'
          />
          <img
            className='theme-switcher__img theme-switcher__sun-img'
            src={sunIcon}
            alt='light theme'
          />
        </div>
      </label>
    </div>
  )
}

export default ThemeSwitcher

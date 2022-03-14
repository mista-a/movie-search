import preloader from './../../../assets/img/preloader.svg'

const Preloader = ({ preloaderClass, preloader__imgClass }) => {
  return (
    <div className={preloaderClass}>
      <img className={preloader__imgClass} src={preloader} alt='loading...' />
    </div>
  )
}

export default Preloader

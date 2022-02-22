import Watchlist from './Watchlist/Watchlist'

//fix Ничего не найдено

const ProfileContent = ({ searchQuery }) => {
  // if (searchQuery !== '' && totalPages === 0 && content.length === 0) {
  //   return <span className='content__not-found'>Ничего не найдено</span>
  // } else {
  return (
    <div className='content'>
      <Watchlist searchQuery={searchQuery} />
    </div>
  )
}

export default ProfileContent

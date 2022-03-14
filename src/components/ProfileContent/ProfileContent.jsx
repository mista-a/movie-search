import Watchlist from './Watchlist/Watchlist'

const ProfileContent = ({ searchQuery }) => {
  return (
    <div className='content'>
      <Watchlist searchQuery={searchQuery} />
    </div>
  )
}

export default ProfileContent

import SearchBar from '../components/SearchBar/SearchBar'
import { MemoUser } from '../components/User/User'
import ProfileContent from '../components/ProfileContent/ProfileContent'

//fix onClickLinkTo так се решение вроде

const Profile = () => {
  return (
    <div className='profile'>
      <MemoUser />
      <SearchBar onClickLinkTo={''} />
      <ProfileContent />
    </div>
  )
}

export default Profile

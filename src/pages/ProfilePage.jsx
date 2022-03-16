import SearchBar from '../components/common/SearchBar/SearchBar'
import { MemoUser } from '../components/User/User'
import ProfileContent from '../components/ProfileContent/ProfileContent'

const Profile = () => {
  return (
    <div className='profile'>
      <MemoUser />
      <SearchBar />
      <ProfileContent />
    </div>
  )
}

export default Profile

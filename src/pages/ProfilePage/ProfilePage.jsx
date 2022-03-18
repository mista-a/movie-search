import Search from '../../components/common/Search/Search'
import { MemoUser } from '../../components/User/User'
import ProfileContent from '../../components/ProfileContent/ProfileContent'
import { useState } from 'react'

//fix .content class

const Profile = () => {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className='profile'>
      <MemoUser />
      <Search value={searchQuery} setValue={setSearchQuery} />
      <div className='profile-content'>
        <ProfileContent searchQuery={searchQuery} />
      </div>
    </div>
  )
}

export default Profile

import Search from '../../components/common/Search/Search'
import { MemoUser } from '../../components/User/User'
import ProfileContent from '../../components/ProfileContent/ProfileContent'
import { useState } from 'react'

const Profile = () => {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className='profile'>
      <MemoUser />
      <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <ProfileContent
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
    </div>
  )
}

export default Profile

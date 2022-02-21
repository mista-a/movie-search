import React, { useState } from 'react'
import { MemoSearchBar } from '../components/SearchBar/SearchBar'
import { MemoUser } from '../components/User/User'
import ProfileContent from '../components/ProfileContent/ProfileContent'

const Profile = () => {
  return (
    <div className='profile'>
      <MemoUser />
      {/* <MemoSearchBar setDelayMessage={setDelayMessage} /> */}
      {/* <ProfileContent searchQuery={delayMessage} /> */}
    </div>
  )
}

export default Profile

import user__avatar from '../../assets/img/user-avatar.png'
import { memo } from 'react'

const User = (props) => {
  return (
    <section className='user'>
      <img src={user__avatar} alt='user avatar' className='user__avatar' />
      <span className='user__name'>mista</span>
    </section>
  )
}

export const MemoUser = memo(User)

import { useEffect, useState } from 'react'

const useHideAnimation = (active, setActive, delay) => {
  const [anim, setAnim] = useState(true)

  useEffect(() => setAnim(true), [active])

  const hide = () => {
    setAnim(false)
    setTimeout(() => setActive(false), delay)
  }

  return { anim, hide }
}

export default useHideAnimation

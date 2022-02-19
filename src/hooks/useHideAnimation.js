import { useEffect, useState } from 'react'

const useHideAnimation = (active, setActive, delay) => {
  const [hideAnimation, setHideAnimation] = useState(!active)

  useEffect(() => {
    setHideAnimation(false)
  }, [active])

  const hide = () => {
    setHideAnimation(true)
    setTimeout(() => setActive(false), delay)
  }

  return { hideAnimation, hide }
}

export default useHideAnimation

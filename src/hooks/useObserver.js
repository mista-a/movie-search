import { useEffect, useRef } from 'react'

const useObserver = (ref, callback, doCallback, dependencies, parameters) => {
  const observerRef = useRef()

  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect()

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && doCallback) {
        callback(entries[0])
      }
    }, parameters)

    if (ref && ref.current) {
      observerRef.current = observer
      observerRef.current.observe(ref.current)
    }
  }, [...dependencies])
}

export default useObserver

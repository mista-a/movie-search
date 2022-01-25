import { useEffect, useRef, useState } from 'react'

//fix SLIDER ДОЛЖЕН БЫТЬ ОТДЕЛЬНЫМ!!!
//ОПРЕДЕЛИСЬ

const Slider = ({ classSlider, children }) => {
  const slideRef = useRef()
  const [state, setState] = useState({
    isScrolling: false,
    clientX: 0,
    scrollX: 0,
  })

  // useEffect(() => {
  //   document.addEventListener('mousedown', onMouseDown)
  //   document.addEventListener('mousemove', onMouseMove)
  //   document.addEventListener('mouseup', onMouseUp)

  //   return () => {
  //     document.removeEventListener('mousedown', onMouseDown)
  //     document.removeEventListener('mousemove', onMouseMove)
  //     document.removeEventListener('mouseup', onMouseUp)
  //   }
  // })

  // const onMouseDown = (e) => {
  //   if (!slideRef) return
  //   e.preventDefault()
  //   setState({ ...state, isScrolling: true, clientX: e.clientX })
  // }

  // const onMouseMove = (e) => {
  //   if (!slideRef) return
  //   e.preventDefault()
  //   const { clientX, scrollX, isScrolling } = state

  //   if (isScrolling) {
  //     if (
  //       slideRef &&
  //       slideRef.current &&
  //       !slideRef.current.contains(e.target)
  //     ) {
  //       return
  //     }
  //     slideRef.current.scrollLeft = scrollX + e.clientX - clientX

  //     setState({
  //       ...state,
  //       scrollX: scrollX - e.clientX + clientX,
  //       clientX: e.clientX,
  //     })
  //   }
  // }

  // const onMouseUp = (e) => {
  //   if (!slideRef) return
  //   e.preventDefault()
  //   setState({ ...state, isScrolling: false })
  // }

  return (
    <div
      className={classSlider}
      // ref={slideRef}
      // onMouseDown={onMouseDown}
      // onMouseMove={onMouseMove}
      // onMouseUp={onMouseUp}
    >
      {children}
    </div>
  )
}

export default Slider

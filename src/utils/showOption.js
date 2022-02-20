const showOption = (watchList, titleId) => {
  let t = true
  watchList.forEach((title) => {
    if (title.id === titleId) {
      t = false
      return
    }
  })
  if (t === false) return false
  return true
}

export default showOption

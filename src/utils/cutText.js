const cutText = (text, size) => {
  const splitedText = text.split(' ')
  const firstWords = splitedText.slice(0, size)
  const joinedText = firstWords.join(' ')
  const cutText = `${joinedText}...`
  return cutText
}

export default cutText

//fix определится с напиcанием

const cutText = (text, size) => {
  const splitedText = text.split(' ')
  const firstWords = splitedText.slice(0, size)
  const joinedText = firstWords.join(' ')
  const cutText = `${joinedText}...`
  return cutText

  //return `${text.split(' ').slice(0, size).join(' ')}...`
}

export default cutText

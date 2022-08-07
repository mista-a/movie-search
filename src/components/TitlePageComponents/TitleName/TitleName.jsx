import AgeLimit from '../AgeLimit/AgeLimit'

const TitleName = ({ name, releaseDate, genres }) => {
  releaseDate = releaseDate.split('-').join('.')

  return (
    <>
      <div className='title-name'>
        <h2 className='title-name__translated'>{name}</h2>
        <AgeLimit />
      </div>
      <div className='subtitle'>
        <span className='release-date'>{releaseDate}</span>
        <div className='geners'>
          {genres.map(({ id, name }) => (
            <b className='geners__name' key={id}>
              &#183;
              <span> {name} </span>
            </b>
          ))}
        </div>
      </div>
    </>
  )
}

export default TitleName

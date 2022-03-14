import AgeLimit from '../AgeLimit/AgeLimit'
import generPartition from '../../../assets/img/gener-partition.png'

const TitleName = ({ name, releaseDate, genres }) => {
  return (
    <>
      <div className='title-name'>
        <h2 className='title-name__translated'>{name}</h2>
        <AgeLimit />
      </div>
      <div className='subtitle'>
        <span className='release-date'>{releaseDate}</span>
        <div className='geners'>
          {genres.map((item, index) => (
            <b key={item.id} className='geners__name'>
              {index && (
                <img
                  src={generPartition}
                  className='geners__partition'
                  alt=' '
                />
              )}
              <span>{`${item.name}`}</span>
            </b>
          ))}
        </div>
      </div>
    </>
  )
}

export default TitleName

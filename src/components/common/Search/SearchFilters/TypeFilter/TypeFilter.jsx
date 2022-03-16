const TypeFilter = ({ changeType }) => {
  return (
    <p className='type-filter'>
      Тип:
      <button className='' onClick={() => changeType('type', 'multi')}>
        Все
      </button>
      <button className='' onClick={() => changeType('type', 'movie')}>
        Кино
      </button>
      <button className='' onClick={() => changeType('type', 'tv')}>
        Сериал
      </button>
    </p>
  )
}

export default TypeFilter

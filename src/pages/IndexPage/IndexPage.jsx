import React, { useContext } from 'react'
import { useEffect } from 'react'
import { HeaderSearchContext } from '../../contexts/HeaderSearchContext'
import styles from './IndexPage.module.sass'

const IndexPage = () => {
  const { setSearchDescription } = useContext(HeaderSearchContext)

  useEffect(() => {
    setSearchDescription('Введите название: ')
    return () => {
      setSearchDescription('')
    }
  }, [])

  return (
    <>
      <div className={styles.indexPage}>
        <p className={styles.description}>
          Если постеры не грузятся, то пожалуйста попробуйте включить VPN или
          Proxy, извините за неудобства
        </p>
      </div>
    </>
  )
}

export default IndexPage

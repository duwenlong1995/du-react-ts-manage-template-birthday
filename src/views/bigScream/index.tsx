import CN from './CN'
import MiddleContent from './MiddleContent'
import HeaderContent from './HeaderContent'
import styles from './styles.module.scss'
import useWindowDimensions from '@/hooks/useWindowDimensions'

const BigScream = () => {
  const renderPage = () => {
    switch (true) {
      case true:
        return <CN />
      default:
        return <CN />
    }
  }
  const { width, height } = useWindowDimensions()
  return (
    <>
      <div style={{ width: width, height: height }} className={styles.main}>
        <div className={styles.pages}>
          <HeaderContent />
          {renderPage()}
        </div>
        <MiddleContent />
      </div>
    </>
  )
}

export default BigScream

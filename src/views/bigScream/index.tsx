import CN from './CN'
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
        <HeaderContent />
        {renderPage()}
      </div>
    </>
  )
}

export default BigScream

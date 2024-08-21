import FooterContent from './FooterContent'
import LeftContent from './LeftContent'
import RightContent from './RightContent'
import styles from './styles.module.scss'
import MiddleContent from './MiddleContent'
import { leftCardData, rightCardData, footCardData } from './config'

const CN = () => {
  return (
    <div className={styles.CN_Container}>
      <MiddleContent className={styles.CN_MiddleContent}>
        <div className={styles.CN_Top}>
          <LeftContent {...leftCardData} className={styles.CN_LeftContainer}></LeftContent>
          <RightContent {...rightCardData} className={styles.CN_RightContainer}></RightContent>
        </div>
        <div className={styles.CN_Bottom}>
          <FooterContent {...footCardData} className={styles.CN_FooterContainer}></FooterContent>
        </div>
      </MiddleContent>
    </div>
  )
}
export default CN

import FooterContent from './FooterContent';
import LeftContent from './LeftContent';
import RightContent from './RightContent';
import styles from './styles.module.scss';
import { leftCardData, rightCardData, footCardData } from './config';

const CN = () => {
    return (
        <div className={styles.CN_Container}>
            <div className={styles.CN_Top}>
                <LeftContent {...leftCardData} className={styles.CN_LeftContainer}></LeftContent>
                <RightContent {...rightCardData} className={styles.CN_RightContainer}></RightContent>
            </div>
            <div className={styles.CN_Bottom}>
                <FooterContent {...footCardData} className={styles.CN_FooterContainer}></FooterContent>
            </div>
        </div>
    );
};
export default CN;

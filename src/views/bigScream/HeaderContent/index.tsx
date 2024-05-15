import { memo } from 'react';
import { useEffect, useRef } from 'react';
import HeaderModule from '../compontents/HeaderModule';
import styles from './styles.module.scss';

export default memo(function HeaderContent() {
    return (
        <>
            <div className={styles.headerContent}>
                <HeaderModule />
            </div>
        </>
    );
});

import { ReactDOM } from 'react';
import { computedIconShow, iconData } from './data';
import styles from './index.module.scss';

interface definedProps {
    iconName?: string;
    color?: string;
    width?: string;
    height?: string;
}

const Icon = (props: definedProps) => {
    const { iconName, color, width, height } = props;
    const size = { width: width ? width : '20', height: height ? height : '20' };
    return <div className={styles.icon_container}>{computedIconShow(iconData, iconName, size, color)}</div>;
};
export default Icon;

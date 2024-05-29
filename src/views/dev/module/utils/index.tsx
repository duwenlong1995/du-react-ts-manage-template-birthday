import Icon from '@/resources/components/Icon';
import styles from './style.module.scss';
/**
 * @description 自定义菜单
 * @param label {String}
 * @param icon {String}
 * @param style {Object}
 * @param describe {String}
 * @returns
 */
export const CustomizeMenu = (renderValue: {
    label: string;
    icon?: string;
    style?: object;
    describe?: string;
    id: number;
}) => {
    const { label, icon, style, describe } = renderValue;

    return (
        <>
            <div className={styles.options_CustomizeMenu}>
                <div className={styles.options_label_left} style={style}>
                    <Icon iconName={icon} color={style?.color} />
                </div>
                <div className={styles.options_label_right}>
                    <div className={styles.options_label_title} style={style}>
                        {label}
                    </div>
                    <div className={styles.options_describe}>{describe}</div>
                </div>
            </div>
        </>
    );
};

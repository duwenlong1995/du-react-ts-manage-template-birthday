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
interface CustomizeMenuProps {
    label: string;
    icon?: string;
    style?: { color?: string };
    describe?: string;
    id: number;
    checked?: boolean;
}
export const CustomizeMenu = (value: CustomizeMenuProps, defaultValue?: any) => {
    const { label, icon, style, describe, checked } = value;
    const renderValue = defaultValue.label === label ? true : false;
    return (
        <>
            <div className={styles.options_CustomizeMenu}>
                <div className={styles.options_label_left}>
                    <Icon iconName={icon} color={style?.color} />
                </div>
                <div className={styles.options_label_right}>
                    <div className={styles.options_label_title} style={style}>
                        {label}
                    </div>
                    <div className={styles.options_describe}>{describe}</div>
                </div>
                <div
                    className={styles.options_label_icon}
                    style={{ display: checked || renderValue ? 'block' : 'none' }}
                >
                    <Icon iconName={'choose'} color={'blue'} />
                </div>
            </div>
        </>
    );
};

import { memo, ReactNode, useRef } from 'react';
import styles from './styles.module.scss';

type TabProps = {
    children?: ReactNode[];
    value: { label: string; icon?: string; style?: object; describe?: string; id: number };
    key: string | number;
    onItemClick?: (val: string) => void;
    renderMenu?: any;
    onChange?: (val: string) => void;
};
const OptionsPro = memo(function OptionsPro({ value, onItemClick, renderMenu, onChange }: TabProps) {
    const handleClick = () => {
        if (onItemClick) {
            onItemClick(value.label);
        }
        if (onChange) {
            onChange(value);
        }
    };
    const childRef = useRef(null);
    return (
        <>
            <div ref={childRef} className={styles.options_label} onClick={handleClick}>
                {renderMenu(value)}
            </div>
        </>
    );
});

export default OptionsPro;

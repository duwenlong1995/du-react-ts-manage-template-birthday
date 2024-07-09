import { memo, ReactNode, useRef, useState } from 'react';
import styles from './styles.module.scss';

type TabProps = {
    children?: ReactNode[];
    value: { label: string; icon?: string; style?: { color?: string }; describe?: string; id: number };
    key: string | number;
    onItemClick?: (val: string) => void;
    renderMenu?: any;
    defaultValue?: any;
};
const OptionsPro = memo(function OptionsPro({ value, onItemClick, renderMenu, defaultValue }: TabProps) {
    const childRef = useRef(null);

    const handleClick = (val: any) => {
        console.log('val::: ', val);
        if (onItemClick) {
            val.checked = true;
            onItemClick(val);
        }
    };

    return (
        <>
            <div ref={childRef} className={styles.options_label} onClick={() => handleClick(value)}>
                {renderMenu(value, defaultValue)}
            </div>
        </>
    );
});

export default OptionsPro;

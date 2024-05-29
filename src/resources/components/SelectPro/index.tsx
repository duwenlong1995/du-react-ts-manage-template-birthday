import Icon from '@/resources/components/Icon';
import React, { memo, ReactNode, useEffect, useRef, useState } from 'react';
import styles from './styles.module.scss';
import { onClickOtherClose } from './utils';
import { Button } from 'antd';

type TabProps = {
    children: ReactNode[];
    backgroundColor?: string;
    border?: boolean;
    textLocation?: string;
    width?: number;
    disabled?: boolean;
    defaultValue?: { label?: string; id?: number };
    type?: string;
};
type inputValue = string | undefined;
const SelectPro = memo(function SelectPro({
    children,
    backgroundColor,
    border,
    textLocation,
    width,
    disabled,
    defaultValue,
    type,
}: TabProps) {
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [inputValue, setInputValue] = useState<inputValue>('');

    const inputRef: React.RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);
    const showMenu = (val: any) => {
        setIsMenuVisible(true);
    };

    const onChange = (e: any) => {
        setInputValue(e.target.value);
        // 处理选中项的逻辑
        // console.log('选中项:', e.target.value);
    };
    const onItemClick = (val: any) => {
        setInputValue(val);
        setIsMenuVisible(false);
    };

    // 使用 React.Children.map 遍历 children，为每个子元素添加 onItemClick 属性
    const renderedChildren = React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
            return React.cloneElement(child, {
                onItemClick: onItemClick, // 添加 onItemClick 属性
            });
        }
        return child;
    });

    const otherAreaRef: React.RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);
    // 监听页面点击事件，点击其他地方时关闭菜单
    onClickOtherClose(setIsMenuVisible, otherAreaRef, isMenuVisible);
    useEffect(() => {
        if (defaultValue) {
            const value = defaultValue.label;
            setInputValue(value);
        }
    }, [defaultValue]);
    const handleOpenMenu = () => {
        setIsMenuVisible(true);
    };
    return (
        <div ref={otherAreaRef} className={styles.SelectPro_container} style={{ width: width }}>
            <div className={border ? styles.SelectPro_selector : styles.SelectPro_selector_borderNone}>
                <span className={styles.SelectPro_selector_input}>
                    {type === 'input' ? (
                        <input
                            type='text'
                            style={{ textAlign: textLocation, cursor: disabled ? 'not-allowed' : 'pointer' }}
                            ref={inputRef}
                            value={inputValue}
                            onChange={onChange}
                            onFocus={showMenu}
                            disabled={disabled}
                        />
                    ) : null}
                    {type === 'button' ? (
                        <Button type='primary' onClick={handleOpenMenu}>
                            修改权限
                        </Button>
                    ) : null}
                    {type === 'span' ? <span onClick={handleOpenMenu}>{inputValue}</span> : null}
                </span>
                {type === 'input' || type === 'span' ? (
                    <span className={styles.SelectPro_selector_label}>
                        <Icon iconName='arrow_down' />
                    </span>
                ) : null}
            </div>
            {isMenuVisible && (
                <div className={styles.SelectPro_menu} style={{ backgroundColor: backgroundColor }}>
                    {renderedChildren}
                </div>
            )}
        </div>
    );
});

export default SelectPro;

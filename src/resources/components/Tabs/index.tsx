import React, { memo, useState, ReactNode } from 'react';
import styles from './styles.module.scss';

type TabProps = {
    children: ReactNode[];
    defaultTabKey: string;
    location?: string;
};

const Tabs = memo(function Tabs({ defaultTabKey, children, location }: TabProps) {
    const [activeTabKey, setActiveTabKey] = useState(defaultTabKey);
    const subItems = children;
    return (
        <div>
            <div className={location === 'middle' ? styles.TabsContainerMiddle : styles.TabsContainer}>
                {children.map((item: any) => (
                    <span
                        key={item.props.tabKey} // Key should be here
                        className={activeTabKey === item.props.tabKey ? styles.TabItemActive : styles.TabItemUnActive}
                        onClick={() => setActiveTabKey(item.props.tabKey)}
                    >
                        {item.props.label}
                    </span>
                ))}
            </div>
            <div>
                {subItems.map((item: any) => {
                    return React.cloneElement(item, {
                        ...item.props,
                        activeTabKey,
                        key: item.props.tabKey,
                    });
                })}
            </div>
        </div>
    );
});

export default Tabs;

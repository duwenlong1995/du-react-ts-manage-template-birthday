import React, { memo, useState, ReactNode } from 'react';

type TabProps = {
    children: ReactNode[];
    defaultTabKey: string;
};

const Tabs = memo(function Tabs({ defaultTabKey, children }: TabProps) {
    const [activeTabKey, setActiveTabKey] = useState(defaultTabKey);

    // Filter out the active tab's content to render it below the tab headers.
    const activeTabContent = children.find((child) => child.props.tabKey === activeTabKey);

    return (
        <div>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                {children.map((item) => (
                    <button
                        key={item.props.tabKey} // Key should be here
                        className={activeTabKey === item.props.tabKey ? 'active' : ''}
                        onClick={() => setActiveTabKey(item.props.tabKey)}
                    >
                        {item.props.label}
                    </button>
                ))}
            </div>
            <div>
                {activeTabContent &&
                    React.cloneElement(activeTabContent, {
                        key: activeTabContent.props.tabKey
                    })}
            </div>
        </div>
    );
});

export default Tabs;

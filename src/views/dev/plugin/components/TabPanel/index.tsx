import { memo, ReactNode } from 'react';

interface TabPanelProps {
    activeTabKey?: string;
    children: ReactNode; // Use ReactNode for children type
    label: string;
    tabKey: string;
}

const TabPanel = memo(function TabPanel({ activeTabKey, children, label, tabKey }: TabPanelProps) {
    // Removed console.log for production optimization
    console.log(children);

    return activeTabKey === tabKey ? <div>{children}</div> : null;
});

export default TabPanel;

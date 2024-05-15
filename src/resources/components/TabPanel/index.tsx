import { memo, ReactNode } from 'react';
import styles from './styles.module.scss';

interface TabPanelProps {
    activeTabKey?: string;
    children: ReactNode; // Use ReactNode for children type
    label: string;
    tabKey: string;
}

const TabPanel = memo(function TabPanel({ activeTabKey, children, label, tabKey }: TabPanelProps) {
    return activeTabKey === tabKey ? <div className={styles.TabPanelContainer}>{children}</div> : null;
});

export default TabPanel;

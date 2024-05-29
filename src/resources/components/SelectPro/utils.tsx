import { useEffect } from 'react';

export const onClickOtherClose = (saveData: Function, otherRef: React.Ref<unknown>, value: boolean) => {
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (otherRef.current && !otherRef.current.contains(event.target as Node)) {
                saveData(false);
            }
        };
        if (value) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [value]);
};

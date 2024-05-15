import { memo } from 'react';

interface definedProps {
    className: string;
    // 其他属性...
}
export default memo(function RightContent(props: definedProps) {
    return (
        <>
            <div {...props}>右边</div>
        </>
    );
});

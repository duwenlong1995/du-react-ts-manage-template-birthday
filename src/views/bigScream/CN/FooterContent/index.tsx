import { memo } from 'react';

interface definedProps {
    className: string;
    // 其他属性...
}

export default memo(function FooterContent(props: definedProps) {
    return (
        <>
            <div {...props}>底部</div>
        </>
    );
});

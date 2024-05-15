import { memo } from 'react';

interface definedProps {
    className: string;
    // 其他属性...
}
export default memo(function LeftContent(props: definedProps) {
    console.log(props);
    return (
        <>
            <div {...props}>左边</div>
        </>
    );
});

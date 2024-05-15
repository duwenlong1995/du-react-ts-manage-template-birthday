import { CSSProperties, FC, ReactNode, useEffect, useState, useContext, memo } from 'react';
import classNames from 'classnames';
import './style.scss';
import UtilsClass from '../../utils/UtilsClass';
import context from '../../utils/context';

// strokeDasharray 的第一个值（填充部分长度）表示进度环的“实线”部分，应该有多长，而第二个值（圆周长）表示整个进度环的周长。
const getRingPercent = (percent: number, r: number) => {
    const perimeter = Math.PI * 2 * r;
    return (percent / 100) * perimeter + ' ' + perimeter;
};

export interface ProgressCircleProps {
    className?: string;
    style?: CSSProperties;
    children?: ReactNode;
    percent?: number;
    // 圆环颜色
    color?: string;
    // 圆环底色
    trackColor?: string;
    // 圆环尺寸
    size?: string | number;
    // 圆环厚度
    thickness?: number;
    // 动画持续时间
    dur?: number;
}

export const CircleProgress: FC<ProgressCircleProps> = (props) => {
    let obj = useContext(context);

    console.log(obj);

    const {
        dur,
        className,
        style,
        children,
        percent = 0,
        color,
        trackColor,
        size,
        thickness = 4,
        ...restProps
    } = props;
    const [finalDashArray, setFinalDashArray] = useState('');
    const radius = 50 - thickness / 2;
    const perimeter = Math.PI * 2 * radius;

    const progressClass = classNames('progress-circle', className);
    const progressStyle = {
        width: size,
        height: size,
        ...style
    };

    const trackStyle = {
        stroke: trackColor,
        strokeWidth: thickness,
        r: radius
    };

    const trailStyle = {
        stroke: color,
        strokeDasharray: finalDashArray,
        strokeWidth: thickness,
        r: radius
    };

    const animateFrom = `0 ${perimeter}`;
    const animateTo = `${(percent / 100) * perimeter} ${perimeter}`;

    useEffect(() => {
        const finalDash = getRingPercent(percent, radius);
        setFinalDashArray(finalDash);
    }, [percent, radius]);

    return (
        <div {...restProps} className={progressClass} style={progressStyle}>
            <svg viewBox='0 0 100 100' className='progress-circle-graph'>
                <circle cx='50' cy='50' fill='none' className='progress-circle-track' style={trackStyle} />
                <circle cx='50' cy='50' fill='none' className='progress-circle-trail' style={trailStyle}>
                    <animate
                        attributeName='stroke-dasharray'
                        begin='0s'
                        dur={dur + 's'} // 动画持续时间，例如1秒
                        from={animateFrom}
                        to={animateTo}
                        fill='freeze'
                    />
                </circle>
            </svg>
            {children}
        </div>
    );
};

export default memo(CircleProgress);

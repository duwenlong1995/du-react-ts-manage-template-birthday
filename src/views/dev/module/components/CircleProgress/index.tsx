import { CSSProperties, FC, ReactNode, useEffect, useState, useContext, memo } from 'react'
import classNames from 'classnames'
import './style.scss'
import UtilsClass from '../../utils/UtilsClass'
import context from '../../utils/context'
import { computedColor } from './utils'

// strokeDasharray 的第一个值（填充部分长度）表示进度环的“实线”部分，应该有多长，而第二个值（圆周长）表示整个进度环的周长。
const getRingPercent = (percent: number, r: number) => {
  const perimeter = Math.PI * 2 * r
  return (percent / 100) * perimeter + ' ' + perimeter
}
interface ProgressCircleProps {
  className?: string
  style?: CSSProperties
  children?: ReactNode
  percent?: number
  // 圆环颜色
  color?: string
  // 圆环底色
  trackColor?: string
  // 圆环尺寸
  size?: string | number
  // 圆环厚度
  thickness?: number
  // 动画持续时间
  dur?: number
  description?: string
  percentStyle?: {}
  descriptionStyle?: {}
  unit: string
}

export const CircleProgress: FC<ProgressCircleProps> = (props) => {
  let obj = useContext(context)
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
    description,
    percentStyle,
    descriptionStyle,
    unit,
    ...restProps
  } = props
  const [finalDashArray, setFinalDashArray] = useState('')
  const [trailStyle, setTrailStyle] = useState({})
  const [trackStyle, setTrackStyle] = useState({})

  const radius = 50 - thickness / 2
  const perimeter = Math.PI * 2 * radius

  const progressClass = classNames('progress-circle', className)
  const progressStyle = {
    width: size,
    height: size,
    ...style,
  }

  const initAnimation = () => {
    const finalDash = getRingPercent(percent, radius)
    const renderValue = computedColor(color, percent) || color
    setTrackStyle({
      stroke: trackColor,
      strokeWidth: thickness,
      r: radius,
    })

    setTrailStyle({
      stroke: renderValue,
      strokeDasharray: finalDash,
      strokeWidth: thickness,
      r: radius,
    })
  }
  useEffect(() => {
    initAnimation()
  }, [percent])
  const animateFrom = `0 ${perimeter}`
  const animateTo = `${(percent / 100) * perimeter} ${perimeter}`

  useEffect(() => {
    const finalDash = getRingPercent(percent, radius)
    setFinalDashArray(finalDash)
  }, [percent, radius])
  const renderPercentStyle = Object.assign({}, percentStyle, { position: 'absolute' })
  const renderDescriptionStyle = Object.assign({}, descriptionStyle, {
    width: size,
    display: description ? 'block' : 'none',
  })

  return (
    <>
      <div {...restProps} className={progressClass} style={progressStyle}>
        <svg viewBox="0 0 100 100" className="progress-circle-graph">
          <circle cx="50" cy="50" fill="none" className="progress-circle-track" style={trackStyle} />
          <circle cx="50" cy="50" fill="none" className="progress-circle-trail" style={trailStyle}>
            <animate
              attributeName="stroke-dasharray"
              begin="0s"
              dur={dur + 's'} // 动画持续时间，例如1秒
              from={animateFrom}
              to={animateTo}
              fill="freeze"
            />
          </circle>
        </svg>
        <div style={renderPercentStyle}>
          {percent}
          {unit}
        </div>
      </div>
      <div className="progress_circle_description" style={renderDescriptionStyle}>
        {description}
      </div>
    </>
  )
}

export default memo(CircleProgress)

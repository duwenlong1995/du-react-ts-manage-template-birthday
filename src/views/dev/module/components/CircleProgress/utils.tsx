type colorProps = [
  { color_value: string; color_range: number[] },
  { color_value: string; color_range: number[] },
  { color_value: string; color_range: number[] },
]
type info_type = { color_value: string; color_range: number[] }
/**
 *计算值是否在区间内返回boolean
 * @param value
 * @param range_arr
 * @returns boolean
 */
export const isInRange = (value: number, range_arr: number[]): boolean => {
  const [min, max] = range_arr
  return value >= min && value <= max
}
/**
 * 根据不同值的范围显示不同的颜色
 * @param color
 * @param percent
 * @returns string
 */
export const computedColor = (color: colorProps, percent: number) => {
  if (color && Array.isArray(color)) {
    let renderValueColor = color
      .map((info: info_type) => {
        if (isInRange(percent / 100, info.color_range)) {
          return info.color_value
        }
      })
      .filter((item) => item !== undefined)
    return renderValueColor[0]
  }
  if (!color) {
    throw new Error('CircleProgress组件的color属性未定义')
  }
}

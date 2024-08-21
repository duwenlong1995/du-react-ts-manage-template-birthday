import { useState, useEffect } from 'react'
const animation = (duration, from, to, onProgress) => {
  let speed = (to - from) / duration
  let start_time = Date.now()
  let value = from
  function _run() {
    //让value发生变化
    // value=from+速度*时间
    let now = Date.now()
    const time = now - start_time
    if (time >= duration) {
      value = to
      onProgress && onProgress(Math.round(value))
      return
    }
    value = from + speed * time
    onProgress && onProgress(Math.round(value))
    // 注册下变化
    requestAnimationFrame(_run)
  }
  _run()
}
const Demo2 = () => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    animation(1000, 0, 10, (val) => {
      setCount(val)
    })
  }, [])
  return <>{count}</>
}
export default Demo2

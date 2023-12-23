//节流
import { useEffect, useCallback, useRef } from 'react';
 
function useThrottle(fn: Function, delay: any, dep = []) {
  //用useRef --确保 useCallback里面的值是最新的，如果用useState会形成闭包，导致return不了最新的函数
  const { current } = useRef<any>({ fn, timer:null })
  useEffect(function () {
    current.fn = fn;
  }, [fn]);
  return useCallback(function f(this: any) {
    if (!current.timer) {
      current.timer = setTimeout(() => {
        delete current.timer
      }, delay)
      current.fn.call(this, arguments)
    }
  }, dep)
}
 
export default useThrottle;
/**
 * @example
 * const throttledHandleClick = useThrottledFunction(handleClick, 500);
 * 这里 每次inputValue变化时,会开始一个计时器。1s后才会更新throttledValue,实现了节流功能。
 */

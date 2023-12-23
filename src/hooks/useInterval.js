//定时执行函数
import { useRef, useEffect } from 'react';

const useInterval = (callback, delay) => {
    const savedCallback = useRef();
  
    useEffect(() => {
      savedCallback.current = callback;
    }); 
  
    useEffect(() => {
      function tick() {
        savedCallback.current();          
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);        
        return () => clearInterval(id);
      }
    }, [delay]);
  }
  /**
 * 
 * @example
 * useInterval(() => {
  // ...
}, 1000); 
 * 这里每1000ms就会调用一次回调函数,实现了定时执行指定函数的功能。
 */
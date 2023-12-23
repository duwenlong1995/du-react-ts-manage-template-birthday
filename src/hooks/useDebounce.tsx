//防抖
import { useEffect, useState } from "react";
const useDebounce = (value: Object, delay: number) => {
  const [deouncedValue, setDebuouncedValue] = useState(value);
  useEffect(() => {
    //每次在value变化以后，设置一个定时器
    const timeout = setTimeout(() => setDebuouncedValue(value), delay);
    //每次在上一个useEffect处理完以后再运行
    return () => clearTimeout(timeout);
  }, [value, delay]);
  return deouncedValue;
};
export default useDebounce;

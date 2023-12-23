import { useState,useCallback } from "react";

// 判断是否是函数
const isFunction = (fn: any): boolean => {
  return typeof fn === "function";
};
function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {
  const [state, setState] = useState<T>(() => {
    try {
      // 判断缓存中是否有key对应的值
      const localState = JSON.parse(localStorage.getItem(key)!);
      if (localState) {
        return localState;
      }
    } catch (error) {
      console.warn("Error", error);
    }
    // @ts-ignore
    return isFunction(initialValue) ? initialValue() : initialValue;
  });
  const updateState: typeof setState = useCallback((value: T) => {
    if (isFunction(value)) {
      // setState的值是一个函数
      setState((value) => {
        const newValue = (value as (value: T) => T)(value);
        localStorage.setItem(key, JSON.stringify(newValue));
        return newValue;
      });
      return;
    }
    if (typeof value === "undefined") {
      localStorage.removeItem(key);
      return;
    }
    setState(value);
    localStorage.setItem(key, JSON.stringify(value));
  }, []);
  return [state, updateState] as const;
}
export default useLocalStorage;

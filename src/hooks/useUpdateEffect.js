import { useEffect, useRef } from 'react';

export default function useUpdateEffect(effect, dependencies) {
  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current) {
      effect();
    } else {
      isMounted.current = true;
    }
  }, dependencies);
}

/**
 * 
 * @example
 * function MyComponent() {
  const [count, setCount] = useState(0);

  useUpdateEffect(() => {
    console.log('Component has updated');
  }, [count]);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
 */


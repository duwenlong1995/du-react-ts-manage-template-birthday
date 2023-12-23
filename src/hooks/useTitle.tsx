//修改浏览器标题
import { useState, useEffect } from "react";

export default function useTitle(initialTitle: String) {
  const [title, setTitle] = useState(initialTitle);

  useEffect(() => {
    document.title = title;
  }, [title]);

  return setTitle;
}
/**
 * 
 * @example
 * function Page() {
  const setTitle = useTitle('Default Title');
 
  return (
    <Button onClick={() => setTitle('New Title')}>
      Click me
    </Button>
  )
}

 */

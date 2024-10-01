import { useEffect, useState } from 'react';

const useDebounce = (debounceValue: any, delay: number) => {
  const [debounce, setDebounce] = useState();
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounce(debounceValue);
    }, delay);
    return () => clearTimeout(handler);
  }, [debounceValue, delay]);

  return debounce;
};
export default useDebounce;

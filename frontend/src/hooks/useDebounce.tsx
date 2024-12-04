import { useEffect, useState } from 'react';

const useDebounce = (debounceValue: string, delay: number) => {
  const [debounce, setDebounce] = useState<string>('');
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounce(debounceValue);
    }, delay);
    return () => clearTimeout(handler);
  }, [debounceValue, delay]);

  return debounce;
};
export default useDebounce;

import { useLocation, useNavigate } from 'react-router-dom';

type QueryParams = {
  get: (key: string) => string | null;
  set: (key: string, value: string | null) => void;
};

const useQueryParams = (): QueryParams => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);

  const get = (key: string): string | null => queryParams.get(key);

  const set = (key: string, value: string | null): void => {
    const currentValue = queryParams.get(key);

    if (currentValue === value) return;

    if (value) {
      queryParams.set(key, value);
    } else {
      queryParams.delete(key);
    }
    navigate(`${location.pathname}?${queryParams.toString()}`, { replace: true });
  };

  return { get, set };
};

export default useQueryParams;

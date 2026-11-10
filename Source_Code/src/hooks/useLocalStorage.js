import { useEffect, useState } from 'react';

/** useState that is saved to localStorage and restored on the next visit. */
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const raw = window.localStorage.getItem(key);
      return raw !== null ? JSON.parse(raw) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* ignore: storage unavailable */
    }
  }, [key, value]);

  return [value, setValue];
}

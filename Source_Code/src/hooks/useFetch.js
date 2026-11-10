import { useCallback, useEffect, useState } from 'react';

/**
 * Fetches JSON from `url` inside useEffect.
 * - Aborts the request in the cleanup function (no state updates after unmount,
 *   no race conditions when `url` changes).
 * - Exposes loading and error state plus a `retry` function.
 */
export function useFetch(url) {
  const [state, setState] = useState({ data: null, loading: true, error: null });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    setState((prev) => ({ ...prev, loading: true, error: null }));

    fetch(url, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error(`Request failed with status ${response.status}`);
        return response.json();
      })
      .then((data) => setState({ data, loading: false, error: null }))
      .catch((error) => {
        if (error.name === 'AbortError') return; // component unmounted or url changed
        setState({ data: null, loading: false, error: error.message || 'Something went wrong' });
      });

    return () => controller.abort();
  }, [url, attempt]);

  const retry = useCallback(() => setAttempt((n) => n + 1), []);

  return { ...state, retry };
}

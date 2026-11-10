import { useEffect } from 'react';

/** Sets document.title for the current page. */
export function usePageTitle(title) {
  useEffect(() => {
    document.title = `${title} | Hooks & Routes`;
  }, [title]);
}

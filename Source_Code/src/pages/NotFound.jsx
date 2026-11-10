import { Link, useLocation } from 'react-router-dom';
import { usePageTitle } from '../hooks/usePageTitle.js';

export default function NotFound() {
  usePageTitle('Page not found');
  const { pathname } = useLocation();

  return (
    <section className="panel">
      <h1>Page not found</h1>
      <p className="lead">
        There is no page at <code>{pathname}</code>. It may have moved, or the address has a typo.
      </p>
      <Link to="/" className="btn btn--primary">Go to home</Link>
    </section>
  );
}

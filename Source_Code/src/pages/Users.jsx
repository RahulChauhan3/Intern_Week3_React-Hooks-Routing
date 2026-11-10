import { useMemo, useState } from 'react';
import { usePageTitle } from '../hooks/usePageTitle.js';
import { useFetch } from '../hooks/useFetch.js';

const API_URL = 'https://jsonplaceholder.typicode.com/users';

function initials(name) {
  return name
    .split(' ')
    .filter((part) => !/^(mr|mrs|ms|dr)\.?$/i.test(part))
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();
}

export default function Users() {
  usePageTitle('Users');
  const { data: users, loading, error, retry } = useFetch(API_URL);
  const [query, setQuery] = useState('');
  const [ascending, setAscending] = useState(true);

  const visible = useMemo(() => {
    if (!users) return [];
    const q = query.trim().toLowerCase();
    const filtered = users.filter(
      (u) =>
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.company.name.toLowerCase().includes(q),
    );
    return filtered.sort((a, b) => (ascending ? 1 : -1) * a.name.localeCompare(b.name));
  }, [users, query, ascending]);

  return (
    <>
      <h1>Users</h1>
      <p className="lead">Fetched from a public API with <code>useEffect</code> when the page opens.</p>

      <div className="toolbar">
        <label htmlFor="user-search" className="visually-hidden">Search users</label>
        <input
          id="user-search"
          className="input"
          type="search"
          placeholder="Search by name, email or company"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          disabled={loading || Boolean(error)}
        />
        <button
          type="button"
          className="btn btn--ghost"
          onClick={() => setAscending((v) => !v)}
          disabled={!users}
        >
          Sort: {ascending ? 'A to Z' : 'Z to A'}
        </button>
      </div>

      {loading && (
        <div className="grid grid--3" aria-busy="true" aria-label="Loading users">
          {Array.from({ length: 6 }, (_, i) => (
            <div key={i} className="user user--skeleton" />
          ))}
        </div>
      )}

      {error && (
        <div className="alert" role="alert">
          <p><strong>Couldn&rsquo;t load users.</strong> {error}. Check your connection and try again.</p>
          <button type="button" className="btn btn--primary" onClick={retry}>Try again</button>
        </div>
      )}

      {!loading && !error && (
        <>
          <p className="muted" role="status">
            Showing {visible.length} of {users.length} users
          </p>
          {visible.length === 0 ? (
            <p className="empty">No users match &ldquo;{query}&rdquo;. Try a different name or company.</p>
          ) : (
            <ul className="grid grid--3 plain">
              {visible.map((user) => (
                <li key={user.id} className="user">
                  <span className="user__avatar" aria-hidden="true">{initials(user.name)}</span>
                  <div>
                    <h2 className="user__name">{user.name}</h2>
                    <a className="user__email" href={`mailto:${user.email}`}>{user.email}</a>
                    <p className="user__meta">{user.company.name} · {user.address.city}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </>
  );
}

import { useEffect } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/users', label: 'Users' },
  { to: '/contact', label: 'Contact' },
];

export default function Layout() {
  const { pathname } = useLocation();

  // Start every new page at the top.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <header className="nav">
        <div className="nav__inner">
          <NavLink to="/" className="nav__brand" end>
            Hooks &amp; Routes
          </NavLink>
          <nav aria-label="Primary">
            <ul className="nav__list">
              {links.map(({ to, label, end }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    end={end}
                    className={({ isActive }) => `nav__link${isActive ? ' is-active' : ''}`}
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      <main id="main" className="page">
        <Outlet />
      </main>

      <footer className="site-footer">
        Built with React, React Router and Vite.
      </footer>
    </>
  );
}

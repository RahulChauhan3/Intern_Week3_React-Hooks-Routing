import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { usePageTitle } from '../hooks/usePageTitle.js';
import { useLocalStorage } from '../hooks/useLocalStorage.js';

function useClock() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id); // cleanup stops the timer when leaving the page
  }, []);

  return now;
}

const tour = [
  {
    to: '/users',
    title: 'Users',
    text: 'Loads a list from an API inside useEffect, with loading, error and retry states, plus live search.',
  },
  {
    to: '/contact',
    title: 'Contact',
    text: 'A controlled form built on useState with validation that runs on blur and on submit.',
  },
];

export default function Home() {
  usePageTitle('Home');
  const now = useClock();
  const [count, setCount] = useLocalStorage('hooks-routes.count', 0);

  // Effect that depends on state: the tab title follows the counter.
  useEffect(() => {
    document.title = count > 0 ? `(${count}) Home | Hooks & Routes` : 'Home | Hooks & Routes';
  }, [count]);

  const time = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const date = now.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <>
      <section className="hero">
        <div>
          <h1 className="hero__title">Routing and hooks, working together.</h1>
          <p className="lead">
            A small React Router app that shows how <code>useState</code> and{' '}
            <code>useEffect</code> work together. Every effect on these pages cleans up after itself.
          </p>
        </div>
        <div className="clock" aria-live="off">
          <span className="clock__time">{time}</span>
          <span className="clock__date">{date}</span>
        </div>
      </section>

      <section className="panel" aria-labelledby="counter-heading">
        <h2 id="counter-heading">Persistent counter</h2>
        <p className="muted">
          State is saved to localStorage by an effect. Change the number, then reload the page. The
          browser tab title updates too.
        </p>
        <div className="counter">
          <button type="button" className="btn btn--ghost" onClick={() => setCount((c) => Math.max(0, c - 1))} aria-label="Decrease">
            −
          </button>
          <output className="counter__value" aria-live="polite">{count}</output>
          <button type="button" className="btn btn--primary" onClick={() => setCount((c) => c + 1)} aria-label="Increase">
            +
          </button>
          <button type="button" className="btn btn--link" onClick={() => setCount(0)} disabled={count === 0}>
            Reset
          </button>
        </div>
      </section>

      <section aria-labelledby="tour-heading">
        <h2 id="tour-heading">Explore the other pages</h2>
        <div className="grid grid--2">
          {tour.map(({ to, title, text }) => (
            <Link key={to} to={to} className="tile">
              <h3>{title}</h3>
              <p>{text}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

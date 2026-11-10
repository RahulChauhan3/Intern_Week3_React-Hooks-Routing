# Hooks & Routes: React Router + useState/useEffect

**Task:** Week 3 – React hooks & routing
Add react-router with 3 pages and use `useEffect` / `useState` properly.

## Technologies and tools used

| Tool | Purpose |
| --- | --- |
| React 19 | Components and hooks |
| React Router (`react-router-dom`) | Client-side routing, nested layout, `NavLink`, `Outlet` |
| Vite | Dev server and production build |
| JSONPlaceholder API | Public API used by the Users page |
| CSS (custom properties) | Styling and responsive layout |

## Pages

| Route | Page | What it demonstrates |
| --- | --- | --- |
| `/` | Home | Live clock (`useEffect` + `setInterval` with cleanup), counter saved to localStorage, tab title that follows state |
| `/users` | Users | Data fetching in `useEffect` with `AbortController`, loading skeleton, error + retry, search and sort with `useState`/`useMemo` |
| `/contact` | Contact | Controlled form with `useState`, validation on blur and on submit, accessible error messages |
| `*` | Not found | Catch-all 404 route |

## How `useState` and `useEffect` are used

- **State** is kept as close as possible to where it is used: the counter lives in `Home`, search text and sort order live in `Users`, form values live in `Contact`. Filtered lists are derived from state instead of stored twice.
- **Every effect has a dependency array**, and effects that start something return a cleanup function:
  - `Home`: `setInterval` is cleared on unmount.
  - `useFetch`: the request is aborted on unmount or when the URL changes, so there are no updates after unmount and no race conditions.
  - `Layout`: scrolls to top when the route changes (`[pathname]`).
  - `usePageTitle`: sets `document.title` per page (`[title]`).
  - `useLocalStorage`: saves the value when it changes (`[key, value]`).
- **Custom hooks** (`src/hooks/`) keep components small: `useFetch`, `useLocalStorage`, `usePageTitle`.

## Project features

- Shared layout with sticky navigation and active-link highlighting
- Skip-to-content link, labelled form fields, visible keyboard focus, `aria-live` regions
- Loading, error, empty and success states on every data-driven screen
- Responsive layout (desktop, tablet, mobile)
- Deployment-ready: `vercel.json` and `public/_redirects` make deep links such as `/users` work after a refresh

## Installation requirements

- [Node.js](https://nodejs.org/) 18 or newer
- npm

## Steps to run the project

```bash
cd Source_Code
npm install
npm run dev
```

Open the URL printed in the terminal (usually http://localhost:5173).

```bash
npm run build     # production build into dist/
npm run preview   # serve the production build locally
```

The Users page needs an internet connection to reach `https://jsonplaceholder.typicode.com/users`.

## Deployment

**Vercel:** import the GitHub repo, set Root Directory to `Source_Code`, framework preset *Vite*. `vercel.json` handles route rewrites.
**Netlify:** base directory `Source_Code`, build command `npm run build`, publish directory `dist`. `public/_redirects` handles route rewrites.

## Output description

Screenshots are in `Output/`:

| File | Shows |
| --- | --- |
| `01-home.png` | Home page with live clock and counter |
| `02-users-error-state.png` | Users page error state with retry button |
| `03-users-loaded.png` | Users page after a successful load |
| `04-users-search.png` | Live search filtering the list |
| `05-contact-validation.png` | Contact form validation messages |
| `06-contact-success.png` | Contact form success view |
| `07-not-found.png` | 404 page for an unknown route |
| `08-mobile-users.png` | Responsive mobile layout |

Note: the screenshots were captured by an automated browser test that served sample data in the same shape as the JSONPlaceholder API, because the capture environment had no internet access. The app itself calls the live API.

## Folder structure

```
Internship_Task/
├── Source_Code/
│   ├── public/            (favicon, _redirects)
│   ├── src/
│   │   ├── components/Layout.jsx
│   │   ├── hooks/         (useFetch, useLocalStorage, usePageTitle)
│   │   ├── pages/         (Home, Users, Contact, NotFound)
│   │   ├── App.jsx        (route table)
│   │   ├── main.jsx       (BrowserRouter)
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   ├── vercel.json
│   └── vite.config.js
├── Output/                (screenshots)
└── README.md
```

## Live demo

Live link: _add your deployed URL here_
GitHub: _add your repository URL here_

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { usePageTitle } from '../hooks/usePageTitle.js';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate({ name, email, message }) {
  const errors = {};
  if (name.trim().length < 2) errors.name = 'Enter your name (at least 2 characters).';
  if (!EMAIL_PATTERN.test(email.trim())) errors.email = 'Enter a valid email address, like name@example.com.';
  if (message.trim().length < 10) errors.message = 'Write at least 10 characters so we can help.';
  return errors;
}

const empty = { name: '', email: '', message: '' };

export default function Contact() {
  usePageTitle('Contact');
  const [values, setValues] = useState(empty);
  const [touched, setTouched] = useState({});
  const [sent, setSent] = useState(false);

  const errors = validate(values);
  const showError = (field) => touched[field] && errors[field];

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (event) => setTouched((prev) => ({ ...prev, [event.target.name]: true }));

  const handleSubmit = (event) => {
    event.preventDefault();
    setTouched({ name: true, email: true, message: true });
    if (Object.keys(errors).length === 0) setSent(true);
  };

  const reset = () => {
    setValues(empty);
    setTouched({});
    setSent(false);
  };

  if (sent) {
    return (
      <>
        <h1>Contact</h1>
        <div className="panel success" role="status">
          <h2>Message ready, {values.name.trim().split(' ')[0]}</h2>
          <p>
            This demo has no backend, so nothing was sent. A real app would post the form data to
            your API.
          </p>
          <dl className="summary">
            <dt>Email</dt><dd>{values.email}</dd>
            <dt>Message</dt><dd>{values.message}</dd>
          </dl>
          <div className="row">
            <button type="button" className="btn btn--primary" onClick={reset}>Write another</button>
            <Link to="/" className="btn btn--ghost">Back to home</Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <h1>Contact</h1>
      <p className="lead">A controlled form: every field is driven by <code>useState</code>.</p>

      <form className="panel form" onSubmit={handleSubmit} noValidate>
        <div className="field">
          <label htmlFor="name">Name</label>
          <input
            id="name" name="name" className="input" autoComplete="name"
            value={values.name} onChange={handleChange} onBlur={handleBlur}
            aria-invalid={Boolean(showError('name'))}
            aria-describedby={showError('name') ? 'name-error' : undefined}
          />
          {showError('name') && <p id="name-error" className="field__error">{errors.name}</p>}
        </div>

        <div className="field">
          <label htmlFor="email">Email</label>
          <input
            id="email" name="email" type="email" className="input" autoComplete="email"
            value={values.email} onChange={handleChange} onBlur={handleBlur}
            aria-invalid={Boolean(showError('email'))}
            aria-describedby={showError('email') ? 'email-error' : undefined}
          />
          {showError('email') && <p id="email-error" className="field__error">{errors.email}</p>}
        </div>

        <div className="field">
          <label htmlFor="message">Message</label>
          <textarea
            id="message" name="message" rows="5" className="input"
            value={values.message} onChange={handleChange} onBlur={handleBlur}
            aria-invalid={Boolean(showError('message'))}
            aria-describedby={showError('message') ? 'message-error' : undefined}
          />
          <div className="field__foot">
            {showError('message') ? <p id="message-error" className="field__error">{errors.message}</p> : <span />}
            <span className="muted">{values.message.length} characters</span>
          </div>
        </div>

        <button type="submit" className="btn btn--primary">Send message</button>
      </form>
    </>
  );
}

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './register.css';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Hasła nie są zgodne.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('http://127.0.0.1:8000/api/register/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();
      setLoading(false);

      if (res.ok) {
        navigate('/login');
      } else {
        setError(data.detail || 'Błąd podczas rejestracji');
      }
    } catch (err) {
      setLoading(false);
      setError('Błąd sieci. Spróbuj ponownie.');
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit} className="register-form">
        <h2>Rejestracja</h2>

        {error && <p className="register-error">{error}</p>}

        <input
          className="register-input"
          placeholder="Nazwa użytkownika"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          className="register-input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          className="register-input"
          type="password"
          placeholder="Hasło"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <input
          className="register-input"
          type="password"
          placeholder="Potwierdź hasło"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <button className="register-button" type="submit" disabled={loading}>
          {loading ? 'Rejestracja...' : 'Zarejestruj się'}
        </button>

        <div className="register-footer">
          <p>Masz już konto? <Link to="/login">Zaloguj się</Link></p>
        </div>
      </form>
    </div>
  );
}

export default Register;

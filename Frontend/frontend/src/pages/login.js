import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';


function Login() {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Obsługa powrotu z logowania Google
  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get('code');

    if (code) {
      const sendCodeToBackend = async () => {
        try {
          const res = await fetch('http://127.0.0.1:8000/dj-rest-auth/google/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              code,
              redirect_uri: 'http://localhost:3000',
            }),
          });

          const data = await res.json();

          if (res.ok) {
            localStorage.setItem('accessToken', data.access);
            localStorage.setItem('refreshToken', data.refresh);
            login(data.user); 
            navigate('/profile');
            } else {
            console.error(data);
            setError(data.detail || 'Błąd logowania');
          }
        } catch (err) {
          console.error('Błąd sieci:', err);
          setError('Błąd sieci podczas logowania przez Google');
        }
      };

      sendCodeToBackend();
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('http://127.0.0.1:8000/api/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      setLoading(false);

      if (res.ok) {
        localStorage.setItem('accessToken', data.access);
        localStorage.setItem('refreshToken', data.refresh);
        login(data.user); 
        navigate('/profile');
      } else {
        setError(data.detail || 'Błąd logowania');
      }
    } catch (err) {
      setLoading(false);
      setError('Błąd sieci. Spróbuj ponownie.');
    }
  };

  const handleGoogleLogin = () => {
    const redirectUri = 'http://localhost:3000';
    const clientId = 'TWÓJ_GOOGLE_CLIENT_ID'; // TODO: Uzupełnij
    const scope = 'openid email profile';

    const url = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;

    window.location.href = url;
  };

  return (
    <div className="login-wrapper">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Logowanie</h2>
        {error && <p className="login-error">{error}</p>}

        <input
          className="login-input"
          placeholder="Nazwa użytkownika"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          className="login-input"
          placeholder="Hasło"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="login-button" type="submit" disabled={loading}>
          {loading ? 'Ładowanie...' : 'Zaloguj się'}
        </button>

        <div className="login-footer">
          <button
            type="button"
            className="google-login-button"
            onClick={handleGoogleLogin}
          >
            Zaloguj się przez Google
          </button>

          <p>Nie masz konta?</p>
          <button
            type="button"
            className="register-button"
            onClick={() => navigate('/register')}
          >
            Zarejestruj się
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;

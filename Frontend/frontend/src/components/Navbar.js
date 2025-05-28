import { Link } from 'react-router-dom';
import './navbar.css';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">ItalianoApp</Link>
        <ul className="navbar-menu">

          {user ? (
  <>
    <li><Link to="/profile" className="navbar-link">Profil</Link></li>
    <li><Link to="/ai-learn" className="navbar-link">AI - Learn</Link></li>
    <li><Link to="/vocabulary" className="navbar-link">Słownictwo</Link></li>
    <li>
      <span className="navbar-link" onClick={logout} style={{ cursor: 'pointer' }}>
        Wyloguj się
      </span>
    </li>
  </>
) : (
  <>
    <li><Link to="/" className="navbar-link">Home</Link></li>
    <li><Link to="/login" className="navbar-link">Login</Link></li>
    <li><Link to="/register" className="navbar-link">Register</Link></li>
  </>
)}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;

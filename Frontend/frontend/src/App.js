import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Login from './pages/login';
import Register from './pages/register';
import Profile from './pages/profile';
import Home from './pages/home';
import VocabularyList from './components/Vocabulary/VocabularyList';
import VocabularyDetail from './components/Vocabulary/VocabularyDetail';



function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/vocabulary" element={<VocabularyList />} />
          <Route path="/vocabulary/:levelId" element={<VocabularyDetail />} />

        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;


import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

function Profile() {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <h2>Witaj, {user?.username || 'Użytkowniku'}!</h2>
      <p>To jest Twój profil.</p>
    </div>
  );
}

export default Profile;

import React, { useState } from 'react';
import Login from './Login';
import BloodGlucose from './BloodGlucose';
import './App.css';

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  const handleLogin = (user) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  return (
    <div className="App">
      {!currentUser ? (
        <Login onLogin={handleLogin} />
      ) : (
        <BloodGlucose user={currentUser} onLogout={handleLogout} />
      )}
    </div>
  );
}

export default App;

import React, { useState } from 'react';

const users = [
    { 
      name: "Sara Norman", 
      id: "5344-9709", 
      doctor: "Dr. Jason Rosenberg", 
      doctorPhone: "579-0432",
      lowGlucoseLevel: 80,  // Sara's threshold for low glucose level
      highGlucoseLevel: 140 // Sara's threshold for high glucose level
    },
    { 
      name: "Gregg Norman", 
      id: "1275-4307", 
      doctor: "Dr. Nikhil Singh", 
      doctorPhone: "334-2309",
      lowGlucoseLevel: 70,  // Gregg's threshold for low glucose level
      highGlucoseLevel: 120 // Gregg's threshold for high glucose level
    }
  ];
  

function Login({ onLogin }) {
  const [selectedUser, setSelectedUser] = useState(users[0].name);

  const handleLogin = () => {
    const user = users.find(user => user.name === selectedUser);
    onLogin(user);
  };

  return (
    <div className='loginHeader'>
      <h1>Diabetes Monitoring</h1>
      <div className = 'loginMenu'>
        <h2> User Login</h2>
      <select value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)}>
        {users.map(user => (
          <option key={user.id} value={user.name}>{user.name}</option>
        ))}
      </select>
      <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}

export default Login;

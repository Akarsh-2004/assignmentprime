import React, { useState, useEffect } from 'react';
import { login, register, apiFetch, setAccessToken } from './services/api';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

export default function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [view, setView] = useState("login"); // 👈 state for which form to show

  useEffect(() => {
    setAccessToken(token);
  }, [token]);

  const onLogin = (data) => {
    setToken(data.accessToken);
    setUser(data.user);
  };

  const onLogout = async () => {
    await fetch('http://localhost:4000/api/v1/auth/logout', { method: 'POST', credentials: 'include' });
    setToken(null);
    setUser(null);
  };

  return (
    <div className="app-container">
      <h2>MERN Assignment Demo</h2>
      {!user ? (
        <>
          {/* Switch between Login & Register */}
          {view === "login" ? (
            <Login onLogin={onLogin} />
          ) : (
            <Register />
          )}

          {/* Toggle links */}
          <div className="toggle-links">
            {view === "login" ? (
              <p>
                Don’t have an account?{" "}
                <button onClick={() => setView("register")}>Register</button>
              </p>
            ) : (
              <p>
                Already have an account?{" "}
                <button onClick={() => setView("login")}>Login</button>
              </p>
            )}
          </div>
        </>
      ) : (
        <>
          <div className="user-info">
            <strong>{user.email}</strong> ({user.role}) 
            <button onClick={onLogout}>Logout</button>
          </div>
          <div className="dashboard">
            <Dashboard />
          </div>
        </>
      )}
    </div>
  );
}

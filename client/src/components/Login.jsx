import React, { useState } from 'react';
import { login } from '../services/api';

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    const res = await login(email, password);
    if (res.error) setErr(res.message);
    else onLogin(res);
  };

  return (
    <div>
      <h3>Login</h3>
      <form onSubmit={submit}>
        <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <br />
        <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        <br />
        <button type="submit">Login</button>
      </form>
      <div style={{ color: 'red' }}>{err}</div>
    </div>
  );
}

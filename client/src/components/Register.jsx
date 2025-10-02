import React, { useState } from 'react';
import { register } from '../services/api';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [msg, setMsg] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    const res = await register(email, password, name);
    if (res.error) setMsg(res.message);
    else setMsg('Registered. Please login.');
  };

  return (
    <div>
      <h3>Register</h3>
      <form onSubmit={onSubmit}>
        <input placeholder="Name" value={name} onChange={e=>setName(e.target.value)} />
        <br />
        <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <br />
        <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        <br />
        <button type="submit">Register</button>
      </form>
      <div>{msg}</div>
    </div>
  );
}

import React, { useEffect, useState } from 'react';
import { apiFetch } from '../services/api';
import './Dashboard.css';
export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDesc] = useState('');

  const load = async () => {
    const res = await apiFetch('/tasks', { method: 'GET' });
    const body = await res.json();
    if (!body.error) setTasks(body.data);
  };

  useEffect(() => { load(); }, []);

  const create = async (e) => {
    e.preventDefault();
    const res = await apiFetch('/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description })
    });
    const body = await res.json();
    if (!body.error) {
      setTitle(''); setDesc('');
      load();
    } else {
      alert(body.message);
    }
  };

  const toggle = async (t) => {
    const res = await apiFetch(`/tasks/${t._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: t.title, description: t.description, completed: !t.completed })
    });
    await res.json();
    load();
  };

  const remove = async (id) => {
    await apiFetch(`/tasks/${id}`, { method: 'DELETE' });
    load();
  };

  return (
    <div>
      <h3>Tasks</h3>
      <form onSubmit={create}>
        <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Title" />
        <input value={description} onChange={e=>setDesc(e.target.value)} placeholder="Description" />
        <button type="submit">Create</button>
      </form>

      <ul>
        {tasks.map(t => (
          <li key={t._id}>
            <b>{t.title}</b> - {t.description} - [{t.completed ? 'Done' : 'Open'}]
            <button onClick={()=>toggle(t)}>{t.completed ? 'Mark Open' : 'Mark Done'}</button>
            <button onClick={()=>remove(t._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

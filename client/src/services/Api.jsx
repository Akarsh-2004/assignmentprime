let accessToken = null;
const API = 'http://localhost:4000/api/ver1';

export function setAccessToken(t) { accessToken = t; }

export async function login(email, password) {
  const res = await fetch(`${API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ email, password })
  });
  return res.json();
}

export async function register(email, password, name) {
  const res = await fetch(`${API}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, name })
  });
  return res.json();
}

export async function refreshToken() {
  const res = await fetch(`${API}/auth/refresh`, {
    method: 'POST',
    credentials: 'include'
  });
  return res.json();
}

export async function apiFetch(path, opts = {}) {
  const headers = opts.headers || {};
  if (accessToken) headers['Authorization'] = `Bearer ${accessToken}`;
  const res = await fetch(`${API}${path}`, { ...opts, headers, credentials: 'include' });

  if (res.status === 401) {
    const ref = await refreshToken();
    if (ref.accessToken) {
      accessToken = ref.accessToken;
      headers['Authorization'] = `Bearer ${accessToken}`;
      return fetch(`${API}${path}`, { ...opts, headers, credentials: 'include' });
    } else {
      throw new Error('Not authenticated');
    }
  }
  return res;
}

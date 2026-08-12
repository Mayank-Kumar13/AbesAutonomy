import React, { useEffect, useState, useCallback } from 'react';
import { authApi } from '../../auth/authApi';
import './AdminPanel.css';

const formatWatchTime = (ms) => {
  const totalMinutes = Math.floor(ms / 60000);
  const days = Math.floor(totalMinutes / 1440);
  const hours = Math.floor((totalMinutes % 1440) / 60);
  const minutes = totalMinutes % 60;
  if (days > 0) return `${days}d ${hours}h ${minutes}m`;
  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
};

const formatDate = (d) => {
  if (!d) return '—';
  return new Date(d).toLocaleString();
};

export default function AdminPanel() {
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [tab, setTab] = useState('users');

  const loadAll = useCallback(async () => {
    try {
      const [statsRes, usersRes, logsRes] = await Promise.all([
        authApi.getAdminStats(),
        authApi.getAdminUsers(),
        authApi.getAdminLogs(),
      ]);
      setStats(statsRes.data);
      setUsers(usersRes.data);
      setLogs(logsRes.data);
      setError('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAll();
    const interval = setInterval(loadAll, 15000);
    return () => clearInterval(interval);
  }, [loadAll]);

  if (loading) {
    return <div className="admin-wrapper"><p className="admin-loading">Loading admin panel...</p></div>;
  }

  return (
    <div className="admin-wrapper">
      <h1 className="admin-title">Admin Panel</h1>

      {error && <p className="admin-error">{error}</p>}

      <div className="admin-cards">
        <div className="admin-card">
          <span className="admin-card-label">Total Registered Users</span>
          <span className="admin-card-value">{stats?.totalUsers ?? '—'}</span>
        </div>
        <div className="admin-card live">
          <span className="admin-card-label">Live Users (last 5 min)</span>
          <span className="admin-card-value">
            <span className="live-dot" /> {stats?.liveUsers ?? '—'}
          </span>
        </div>
        <div className="admin-card">
          <span className="admin-card-label">Verified Users</span>
          <span className="admin-card-value">{stats?.verifiedUsers ?? '—'}</span>
        </div>
        <div className="admin-card">
          <span className="admin-card-label">Total Watch Time (all users)</span>
          <span className="admin-card-value">{formatWatchTime(stats?.totalWatchTimeMs ?? 0)}</span>
        </div>
      </div>

      <div className="admin-tabs">
        <button className={`admin-tab-btn ${tab === 'users' ? 'active' : ''}`} onClick={() => setTab('users')}>
          Users
        </button>
        <button className={`admin-tab-btn ${tab === 'logs' ? 'active' : ''}`} onClick={() => setTab('logs')}>
          Login Logs
        </button>
      </div>

      {tab === 'users' && (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Status</th>
                <th>Name</th>
                <th>Email</th>
                <th>Provider</th>
                <th>Verified</th>
                <th>Logins</th>
                <th>Watch Time</th>
                <th>Last Active</th>
                <th>Joined</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id}>
                  <td>
                    {u.isLive ? <span className="badge live-badge">Live</span> : <span className="badge">Offline</span>}
                  </td>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.provider}</td>
                  <td>{u.emailVerified ? 'Yes' : 'No'}</td>
                  <td>{u.loginCount || 0}</td>
                  <td>{formatWatchTime(u.totalWatchTimeMs || 0)}</td>
                  <td>{formatDate(u.lastActiveAt)}</td>
                  <td>{formatDate(u.createdAt)}</td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr><td colSpan={9} className="admin-empty">No users yet</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {tab === 'logs' && (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Provider</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((l) => (
                <tr key={l._id}>
                  <td>{l.name}</td>
                  <td>{l.email}</td>
                  <td>{l.provider}</td>
                  <td>{formatDate(l.createdAt)}</td>
                </tr>
              ))}
              {logs.length === 0 && (
                <tr><td colSpan={4} className="admin-empty">No login activity yet</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
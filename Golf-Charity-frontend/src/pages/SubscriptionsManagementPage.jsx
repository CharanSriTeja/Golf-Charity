import React, { useState } from 'react';
import { AdminSidebar } from '../components/AdminSidebar';
import { Button } from '../components/Button';

export const SubscriptionsManagementPage = () => {
  const [subscriptions, setSubscriptions] = useState([
    { id: 1, userId: 'user_001', userName: 'John Doe', email: 'john@example.com', plan: 'monthly', status: 'active', startDate: '2024-01-15', endDate: '2025-01-14', amount: '₹999' },
    { id: 2, userId: 'user_002', userName: 'Jane Smith', email: 'jane@example.com', plan: 'yearly', status: 'active', startDate: '2023-06-01', endDate: '2024-06-01', amount: '₹9,999' },
    { id: 3, userId: 'user_003', userName: 'Raj Patel', email: 'raj@example.com', plan: 'monthly', status: 'cancelled', startDate: '2023-12-01', endDate: '2024-01-01', amount: '₹999' },
  ]);

  const [filterStatus, setFilterStatus] = useState('all');

  const filteredSubscriptions = filterStatus === 'all' 
    ? subscriptions 
    : subscriptions.filter(s => s.status === filterStatus);

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'var(--accent)';
      case 'cancelled': return '#DC2626';
      case 'expired': return 'var(--muted)';
      default: return 'var(--ink)';
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg)' }}>
      <AdminSidebar />
      <div style={{ flex: 1, padding: '40px' }}>
        <style>{`
          .page-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 40px;
            flex-wrap: wrap;
            gap: 20px;
          }
          .page-title {
            font-size: 32px;
            font-weight: 700;
            font-family: 'Playfair Display', serif;
          }
          .filter-group {
            display: flex;
            gap: 8px;
          }
          .filter-btn {
            padding: 8px 16px;
            border: 1px solid var(--border);
            background: var(--surface);
            border-radius: 6px;
            cursor: pointer;
            font-size: 14px;
            transition: all 0.2s;
          }
          .filter-btn.active {
            background: var(--accent);
            color: white;
            border-color: var(--accent);
          }
          .filter-btn:hover {
            border-color: var(--accent);
          }
          .table-container {
            background: var(--surface);
            border: 1px solid var(--border);
            border-radius: var(--radius);
            overflow-x: auto;
          }
          table {
            width: 100%;
            border-collapse: collapse;
          }
          thead {
            background: var(--bg);
            border-bottom: 2px solid var(--border);
          }
          th {
            padding: 16px;
            text-align: left;
            font-weight: 600;
            color: var(--ink);
            font-size: 14px;
          }
          tbody tr {
            border-bottom: 1px solid var(--border);
            transition: background 0.2s;
          }
          tbody tr:hover {
            background: var(--gold-light);
          }
          td {
            padding: 16px;
            font-size: 14px;
          }
          .status-badge {
            display: inline-block;
            padding: 4px 12px;
            border-radius: 50px;
            font-size: 12px;
            font-weight: 600;
            text-transform: capitalize;
          }
          .status-active {
            background: var(--accent-light);
            color: var(--accent);
          }
          .status-cancelled {
            background: #FEE2E2;
            color: #DC2626;
          }
          .status-expired {
            background: #F3F4F6;
            color: var(--muted);
          }
          .action-buttons {
            display: flex;
            gap: 8px;
          }
          .action-btn {
            padding: 4px 12px;
            border: 1px solid var(--border);
            background: transparent;
            border-radius: 4px;
            cursor: pointer;
            font-size: 12px;
            transition: all 0.2s;
          }
          .action-btn:hover {
            background: var(--accent);
            color: white;
            border-color: var(--accent);
          }
          .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 16px;
            margin-bottom: 40px;
          }
          .stat-card {
            background: var(--surface);
            border: 1px solid var(--border);
            border-radius: var(--radius);
            padding: 20px;
            text-align: center;
          }
          .stat-num {
            font-size: 28px;
            font-weight: 700;
            color: var(--accent);
            margin-bottom: 8px;
            font-family: 'Playfair Display', serif;
          }
          .stat-label {
            font-size: 13px;
            color: var(--muted);
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
        `}</style>

        <div className="page-header">
          <h1 className="page-title">Subscriptions</h1>
          <div className="filter-group">
            {['all', 'active', 'cancelled', 'expired'].map(status => (
              <button
                key={status}
                className={`filter-btn ${filterStatus === status ? 'active' : ''}`}
                onClick={() => setFilterStatus(status)}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-num">{subscriptions.length}</div>
            <div className="stat-label">Total Subscriptions</div>
          </div>
          <div className="stat-card">
            <div className="stat-num">{subscriptions.filter(s => s.status === 'active').length}</div>
            <div className="stat-label">Active</div>
          </div>
          <div className="stat-card">
            <div className="stat-num">₹{(subscriptions.filter(s => s.status === 'active').length * 999).toLocaleString('en-IN')}</div>
            <div className="stat-label">Monthly Revenue</div>
          </div>
          <div className="stat-card">
            <div className="stat-num">{Math.round((subscriptions.filter(s => s.status === 'active').length / subscriptions.length) * 100)}%</div>
            <div className="stat-label">Retention Rate</div>
          </div>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>User</th>
                <th>Email</th>
                <th>Plan</th>
                <th>Amount</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSubscriptions.map(sub => (
                <tr key={sub.id}>
                  <td><strong>{sub.userName}</strong></td>
                  <td>{sub.email}</td>
                  <td style={{ textTransform: 'capitalize' }}>{sub.plan}</td>
                  <td>{sub.amount}</td>
                  <td>{sub.startDate}</td>
                  <td>{sub.endDate}</td>
                  <td>
                    <span className={`status-badge status-${sub.status}`}>
                      {sub.status}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button className="action-btn">View</button>
                      {sub.status === 'active' && (
                        <button className="action-btn" style={{ borderColor: '#DC2626', color: '#DC2626' }}>
                          Cancel
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

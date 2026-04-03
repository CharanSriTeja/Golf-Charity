import React, { useState, useEffect } from 'react';
import { AdminSidebar } from '../components/AdminSidebar';
import { Input } from '../components/Input';
import { formatters } from '../utils/formatters';
import { adminAPI } from '../api/admin';

export const UserManagementPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const res = await adminAPI.getUsers({ role: 'user' });
      setUsers(res.data.users || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          user.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || (filterStatus === 'active' ? user.isActive : !user.isActive);
    return matchesSearch && matchesFilter;
  });

  const handleToggleSuspend = async (user) => {
    if (!window.confirm(`Are you sure you want to ${user.isActive !== false ? 'suspend' : 'activate'} this user?`)) return;
    try {
      await adminAPI.updateUser(user._id, { isActive: user.isActive === false ? true : false });
      setSelectedUser(null);
      fetchUsers();
    } catch (err) {
      alert('Error updating user status');
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm("Are you sure you want to permanently delete this user?")) return;
    try {
      // Assuming adminAPI.deleteUser corresponds to user delete endpoint /api/users/:id
      // Let's use standard client bypass if the api helper isn't mapped
      const client = require('../api/client').default;
      await client.delete(`/users/${userId}`);
      setSelectedUser(null);
      fetchUsers();
    } catch (err) {
      alert('Error deleting user');
    }
  };

  return (
    <div className="flex h-screen bg-bg">
      <AdminSidebar />
      <main className="flex-1 overflow-auto">
        <div className="bg-surface border-b border-border p-6">
          <h1 className="font-playfair text-3xl font-bold text-ink">User Management</h1>
          <p className="text-muted mt-1">Manage platform users directly from database</p>
        </div>

        <div className="p-6">
          <div className="bg-surface rounded-lg p-6 border border-border mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Input placeholder="Search by name or email..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
              </div>
              <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="px-4 py-3 rounded-lg border border-border bg-surface text-ink">
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div className="bg-surface rounded-lg border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-bg border-b border-border">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-600 text-muted">User</th>
                    <th className="px-6 py-3 text-left text-sm font-600 text-muted">Email</th>
                    <th className="px-6 py-3 text-left text-sm font-600 text-muted">Status</th>
                    <th className="px-6 py-3 text-left text-sm font-600 text-muted">Subscription Plan</th>
                    <th className="px-6 py-3 text-left text-sm font-600 text-muted">Role</th>
                    <th className="px-6 py-3 text-left text-sm font-600 text-muted">Joined</th>
                    <th className="px-6 py-3 text-left text-sm font-600 text-muted">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr><td colSpan="7" className="text-center p-6 text-muted">Loading live user data...</td></tr>
                  ) : filteredUsers.length === 0 ? (
                    <tr><td colSpan="7" className="text-center p-6 text-muted">No users found.</td></tr>
                  ) : filteredUsers.map(user => (
                    <tr key={user._id} className="border-b border-border hover:bg-bg transition-colors">
                      <td className="px-6 py-4"><p className="font-600 text-ink">{user.name}</p></td>
                      <td className="px-6 py-4 text-sm text-muted">{user.email}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-600 ${user.isActive !== false ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                          {user.isActive !== false ? 'Active' : 'Suspended'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-ink">{user.subscription?.plan || 'None'}</td>
                      <td className="px-6 py-4 text-sm font-600 text-muted">{user.role || 'user'}</td>
                      <td className="px-6 py-4 text-sm text-muted">{formatters.date(user.createdAt)}</td>
                      <td className="px-6 py-4 text-sm">
                        <button onClick={() => setSelectedUser(user)} className="px-3 py-1 rounded bg-blue-100 text-blue-700 hover:bg-blue-200 font-600 text-xs mr-2">View</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {selectedUser && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-surface rounded-lg p-8 max-w-md w-full">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-playfair text-2xl font-bold text-ink">User Details</h2>
                  <button onClick={() => setSelectedUser(null)} className="text-ink hover:text-muted text-2xl">✕</button>
                </div>
                <div className="space-y-4 mb-6">
                  <div><p className="text-sm text-muted mb-1">Name</p><p className="font-600 text-ink">{selectedUser.name}</p></div>
                  <div><p className="text-sm text-muted mb-1">Email</p><p className="font-600 text-ink">{selectedUser.email}</p></div>
                  <div><p className="text-sm text-muted mb-1">Status</p><p className="font-600 text-ink">{selectedUser.isActive !== false ? 'Active' : 'Suspended'}</p></div>
                  <div><p className="text-sm text-muted mb-1">Total Spent</p><p className="font-600 text-gold text-lg">{formatters.currency(selectedUser.totalSpent || 0)}</p></div>
                  <div><p className="text-sm text-muted mb-1">Member Since</p><p className="font-600 text-ink">{formatters.date(selectedUser.createdAt)}</p></div>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => handleToggleSuspend(selectedUser)} className="flex-1 px-4 py-2 rounded-lg bg-yellow-100 text-yellow-700 font-600 hover:bg-yellow-200">
                    {selectedUser.isActive !== false ? 'Suspend User' : 'Activate User'}
                  </button>
                  <button onClick={() => handleDeleteUser(selectedUser._id)} className="flex-1 px-4 py-2 rounded-lg bg-red-100 text-red-700 font-600 hover:bg-red-200">
                    Delete Data
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

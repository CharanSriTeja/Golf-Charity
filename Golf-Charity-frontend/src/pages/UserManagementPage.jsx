import React, { useState } from 'react';
import { AdminSidebar } from '../components/AdminSidebar';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { formatters } from '../utils/formatters';

export const UserManagementPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedUser, setSelectedUser] = useState(null);

  // Mock user data
  const users = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      status: 'active',
      subscription: 'monthly',
      joinDate: '2026-01-15',
      winnings: 2500,
      charity: 'Save the Children'
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      status: 'active',
      subscription: 'yearly',
      joinDate: '2025-12-20',
      winnings: 5000,
      charity: 'Wildlife Trust'
    },
    {
      id: '3',
      name: 'Bob Johnson',
      email: 'bob@example.com',
      status: 'inactive',
      subscription: 'none',
      joinDate: '2025-11-10',
      winnings: 0,
      charity: null
    },
    {
      id: '4',
      name: 'Alice Williams',
      email: 'alice@example.com',
      status: 'active',
      subscription: 'monthly',
      joinDate: '2026-02-01',
      winnings: 1500,
      charity: 'Education for All'
    }
  ];

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || user.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleSuspendUser = (userId) => {
    // TODO: Call API to suspend user
    console.log('Suspend user:', userId);
  };

  const handleDeleteUser = (userId) => {
    // TODO: Call API to delete user
    console.log('Delete user:', userId);
  };

  return (
    <div className="flex h-screen bg-bg">
      <AdminSidebar />
      
      <main className="flex-1 overflow-auto">
        {/* Top Bar */}
        <div className="bg-surface border-b border-border p-6">
          <h1 className="font-playfair text-3xl font-bold text-ink">User Management</h1>
          <p className="text-muted mt-1">Manage platform users and their accounts</p>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Filters */}
          <div className="bg-surface rounded-lg p-6 border border-border mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Search by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-3 rounded-lg border border-border bg-surface text-ink"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          {/* Users Table */}
          <div className="bg-surface rounded-lg border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-bg border-b border-border">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-600 text-muted">User</th>
                    <th className="px-6 py-3 text-left text-sm font-600 text-muted">Email</th>
                    <th className="px-6 py-3 text-left text-sm font-600 text-muted">Status</th>
                    <th className="px-6 py-3 text-left text-sm font-600 text-muted">Subscription</th>
                    <th className="px-6 py-3 text-left text-sm font-600 text-muted">Winnings</th>
                    <th className="px-6 py-3 text-left text-sm font-600 text-muted">Joined</th>
                    <th className="px-6 py-3 text-left text-sm font-600 text-muted">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map(user => (
                    <tr key={user.id} className="border-b border-border hover:bg-bg transition-colors">
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-600 text-ink">{user.name}</p>
                          {user.charity && <p className="text-xs text-muted">{user.charity}</p>}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-muted">{user.email}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-600 ${
                          user.status === 'active'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}>
                          {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-ink">
                        {user.subscription === 'none' ? (
                          <span className="text-muted">-</span>
                        ) : (
                          user.subscription.charAt(0).toUpperCase() + user.subscription.slice(1)
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm font-600 text-gold">
                        {formatters.currency(user.winnings)}
                      </td>
                      <td className="px-6 py-4 text-sm text-muted">
                        {formatters.date(user.joinDate)}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <div className="flex gap-2">
                          <button
                            onClick={() => setSelectedUser(user)}
                            className="px-3 py-1 rounded bg-blue-100 text-blue-700 hover:bg-blue-200 font-600 text-xs"
                          >
                            View
                          </button>
                          <button
                            onClick={() => handleSuspendUser(user.id)}
                            className="px-3 py-1 rounded bg-yellow-100 text-yellow-700 hover:bg-yellow-200 font-600 text-xs"
                          >
                            Suspend
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredUsers.length === 0 && (
              <div className="p-8 text-center">
                <p className="text-muted">No users found</p>
              </div>
            )}
          </div>

          {/* User Details Modal */}
          {selectedUser && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-surface rounded-lg p-8 max-w-md w-full">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-playfair text-2xl font-bold text-ink">User Details</h2>
                  <button
                    onClick={() => setSelectedUser(null)}
                    className="text-ink hover:text-muted text-2xl"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-4 mb-6">
                  <div>
                    <p className="text-sm text-muted mb-1">Name</p>
                    <p className="font-600 text-ink">{selectedUser.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted mb-1">Email</p>
                    <p className="font-600 text-ink">{selectedUser.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted mb-1">Status</p>
                    <p className="font-600 text-ink">{selectedUser.status}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted mb-1">Subscription</p>
                    <p className="font-600 text-ink">{selectedUser.subscription}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted mb-1">Total Winnings</p>
                    <p className="font-600 text-gold text-lg">{formatters.currency(selectedUser.winnings)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted mb-1">Member Since</p>
                    <p className="font-600 text-ink">{formatters.date(selectedUser.joinDate)}</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setSelectedUser(null)}
                    className="flex-1 px-4 py-2 rounded-lg bg-bg text-ink font-600 hover:bg-opacity-80"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      handleDeleteUser(selectedUser.id);
                      setSelectedUser(null);
                    }}
                    className="flex-1 px-4 py-2 rounded-lg bg-red-100 text-red-700 font-600 hover:bg-red-200"
                  >
                    Delete User
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

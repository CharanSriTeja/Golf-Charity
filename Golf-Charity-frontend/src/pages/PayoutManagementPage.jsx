import React, { useState } from 'react';
import { AdminSidebar } from '../components/AdminSidebar';
import { Button } from '../components/Button';
import { formatters } from '../utils/formatters';

export const PayoutManagementPage = () => {
  const [filterStatus, setFilterStatus] = useState('all');

  const payouts = [
    {
      id: '1',
      user: 'John Doe',
      amount: 2250,
      donationAmount: 250,
      charity: 'Save the Children',
      draw: 'January 2026',
      status: 'paid',
      date: '2026-02-05',
      paidDate: '2026-02-07'
    },
    {
      id: '2',
      user: 'Jane Smith',
      amount: 2700,
      donationAmount: 300,
      charity: 'Wildlife Trust India',
      draw: 'December 2025',
      status: 'paid',
      date: '2026-01-10',
      paidDate: '2026-01-12'
    },
    {
      id: '3',
      user: 'Alice Williams',
      amount: 1500,
      donationAmount: 150,
      charity: 'Clean India Initiative',
      draw: 'November 2025',
      status: 'pending',
      date: '2025-12-08',
      paidDate: null
    },
    {
      id: '4',
      user: 'Bob Johnson',
      amount: 3000,
      donationAmount: 300,
      charity: 'Education for All',
      draw: 'October 2025',
      status: 'pending',
      date: '2025-11-15',
      paidDate: null
    }
  ];

  const filteredPayouts = payouts.filter(payout => {
    if (filterStatus === 'all') return true;
    return payout.status === filterStatus;
  });

  const stats = {
    totalPending: payouts.filter(p => p.status === 'pending').reduce((sum, p) => sum + p.amount, 0),
    totalPaid: payouts.filter(p => p.status === 'paid').reduce((sum, p) => sum + p.amount, 0),
    totalDonated: payouts.reduce((sum, p) => sum + p.donationAmount, 0),
    pendingCount: payouts.filter(p => p.status === 'pending').length
  };

  const handleMarkAsPaid = (payoutId) => {
    // TODO: Call API to mark payout as paid
    console.log('Mark as paid:', payoutId);
  };

  return (
    <div className="flex h-screen bg-bg">
      <AdminSidebar />
      
      <main className="flex-1 overflow-auto">
        {/* Top Bar */}
        <div className="bg-surface border-b border-border p-6">
          <h1 className="font-playfair text-3xl font-bold text-ink">Payout Management</h1>
          <p className="text-muted mt-1">Track and manage user winnings payouts</p>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-surface rounded-lg p-6 border border-border">
              <p className="text-muted text-sm font-600 mb-2">Pending Payouts</p>
              <p className="font-playfair text-3xl font-bold text-gold mb-1">
                {formatters.currency(stats.totalPending)}
              </p>
              <p className="text-xs text-muted">{stats.pendingCount} pending</p>
            </div>

            <div className="bg-surface rounded-lg p-6 border border-border">
              <p className="text-muted text-sm font-600 mb-2">Total Paid</p>
              <p className="font-playfair text-3xl font-bold text-accent mb-1">
                {formatters.currency(stats.totalPaid)}
              </p>
              <p className="text-xs text-muted">Lifetime payouts</p>
            </div>

            <div className="bg-surface rounded-lg p-6 border border-border">
              <p className="text-muted text-sm font-600 mb-2">Total Donations</p>
              <p className="font-playfair text-3xl font-bold text-ink mb-1">
                {formatters.currency(stats.totalDonated)}
              </p>
              <p className="text-xs text-muted">To charities</p>
            </div>

            <div className="bg-surface rounded-lg p-6 border border-border">
              <p className="text-muted text-sm font-600 mb-2">Success Rate</p>
              <p className="font-playfair text-3xl font-bold text-green-600 mb-1">
                {Math.round((payouts.filter(p => p.status === 'paid').length / payouts.length) * 100)}%
              </p>
              <p className="text-xs text-muted">Successful payments</p>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-surface rounded-lg p-6 border border-border mb-6">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <label className="text-sm font-600 text-ink">Filter by Status:</label>
              <div className="flex gap-2">
                {['all', 'pending', 'paid'].map(status => (
                  <button
                    key={status}
                    onClick={() => setFilterStatus(status)}
                    className={`px-4 py-2 rounded-lg font-600 text-sm transition-all ${
                      filterStatus === status
                        ? 'bg-accent text-white'
                        : 'bg-bg text-ink hover:bg-accent-light'
                    }`}
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Payouts Table */}
          <div className="bg-surface rounded-lg border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-bg border-b border-border">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-600 text-muted">User</th>
                    <th className="px-6 py-3 text-left text-sm font-600 text-muted">Draw</th>
                    <th className="px-6 py-3 text-left text-sm font-600 text-muted">Charity</th>
                    <th className="px-6 py-3 text-left text-sm font-600 text-muted">Amount</th>
                    <th className="px-6 py-3 text-left text-sm font-600 text-muted">Donation</th>
                    <th className="px-6 py-3 text-left text-sm font-600 text-muted">Status</th>
                    <th className="px-6 py-3 text-left text-sm font-600 text-muted">Date</th>
                    <th className="px-6 py-3 text-left text-sm font-600 text-muted">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPayouts.map(payout => (
                    <tr key={payout.id} className="border-b border-border hover:bg-bg transition-colors">
                      <td className="px-6 py-4">
                        <p className="font-600 text-ink">{payout.user}</p>
                      </td>
                      <td className="px-6 py-4 text-sm text-muted">{payout.draw}</td>
                      <td className="px-6 py-4 text-sm text-muted">{payout.charity}</td>
                      <td className="px-6 py-4 text-sm font-bold text-gold">
                        {formatters.currency(payout.amount)}
                      </td>
                      <td className="px-6 py-4 text-sm font-bold text-accent">
                        {formatters.currency(payout.donationAmount)}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-600 ${
                          payout.status === 'paid'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {payout.status === 'paid' ? '✓ Paid' : 'Pending'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-muted">
                        {payout.status === 'paid'
                          ? formatters.date(payout.paidDate)
                          : formatters.date(payout.date)}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        {payout.status === 'pending' && (
                          <button
                            onClick={() => handleMarkAsPaid(payout.id)}
                            className="px-3 py-1 rounded bg-green-100 text-green-700 hover:bg-green-200 font-600 text-xs"
                          >
                            Mark Paid
                          </button>
                        )}
                        {payout.status === 'paid' && (
                          <span className="text-xs text-muted">Completed</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredPayouts.length === 0 && (
              <div className="p-8 text-center">
                <p className="text-muted">No payouts found</p>
              </div>
            )}
          </div>

          {/* Donation Report */}
          <div className="mt-8 bg-surface rounded-lg p-6 border border-border">
            <h2 className="font-playfair font-bold text-ink mb-4">Donation Report</h2>
            <p className="text-muted text-sm mb-4">
              Summary of donations made to charities through winning payouts
            </p>
            <div className="space-y-3">
              {['Save the Children', 'Wildlife Trust India', 'Clean India Initiative', 'Education for All'].map(charity => (
                <div key={charity} className="flex items-center justify-between p-3 rounded-lg bg-bg">
                  <p className="font-600 text-ink">{charity}</p>
                  <p className="font-bold text-accent">{formatters.currency(Math.floor(Math.random() * 50000) + 10000)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

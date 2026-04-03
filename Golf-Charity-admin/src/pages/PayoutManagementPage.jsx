import React, { useState, useEffect } from 'react';
import { AdminSidebar } from '../components/AdminSidebar';
import { formatters } from '../utils/formatters';
import { adminAPI } from '../api/admin';

export const PayoutManagementPage = () => {
  const [filterStatus, setFilterStatus] = useState('all');
  const [payouts, setPayouts] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadPayouts = async () => {
    try {
      // Typically payouts would be a specific type of transaction or a separate schema.
      // We will proxy to subscriptions endpoint checking for type 'payout' if it ever exists.
      const res = await adminAPI.getSubscriptions({ type: 'payout' }).catch(() => ({ data: { transactions: [] } }));
      setPayouts(res.data.transactions || []);
    } catch(e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPayouts();
  }, []);

  const filteredPayouts = payouts.filter(payout => {
    if (filterStatus === 'all') return true;
    return payout.status === filterStatus;
  });

  const stats = {
    totalPending: payouts.filter(p => p.status === 'pending').reduce((sum, p) => sum + (p.amount || 0), 0),
    totalPaid: payouts.filter(p => p.status === 'success' || p.status === 'paid').reduce((sum, p) => sum + (p.amount || 0), 0),
    totalDonated: payouts.reduce((sum, p) => sum + (p.amount ? p.amount * 0.1 : 0), 0), // rough estimate of donation cut
    pendingCount: payouts.filter(p => p.status === 'pending').length
  };

  const handleMarkAsPaid = async (payoutId) => {
    if (!window.confirm("Mark as paid?")) return;
    try {
      await adminAPI.markPayoutAsPaid(payoutId);
      loadPayouts();
    } catch(e) { console.error(e) }
  };

  return (
    <div className="flex h-screen bg-bg">
      <AdminSidebar />
      <main className="flex-1 overflow-auto">
        <div className="bg-surface border-b border-border p-6">
          <h1 className="font-playfair text-3xl font-bold text-ink">Payout Management</h1>
          <p className="text-muted mt-1">Track transaction distributions live</p>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-surface rounded-lg p-6 border border-border">
              <p className="text-muted text-sm font-600 mb-2">Pending Escrow</p>
              <p className="font-playfair text-3xl font-bold text-gold mb-1">{formatters.currency(stats.totalPending)}</p>
              <p className="text-xs text-muted">{stats.pendingCount} pending items</p>
            </div>
            <div className="bg-surface rounded-lg p-6 border border-border">
              <p className="text-muted text-sm font-600 mb-2">Total Lifted</p>
              <p className="font-playfair text-3xl font-bold text-accent mb-1">{formatters.currency(stats.totalPaid)}</p>
            </div>
            <div className="bg-surface rounded-lg p-6 border border-border">
              <p className="text-muted text-sm font-600 mb-2">Implied Charity Match</p>
              <p className="font-playfair text-3xl font-bold text-ink mb-1">{formatters.currency(stats.totalDonated)}</p>
            </div>
            <div className="bg-surface rounded-lg p-6 border border-border">
              <p className="text-muted text-sm font-600 mb-2">Success Rate</p>
              <p className="font-playfair text-3xl font-bold text-green-600 mb-1">
                {payouts.length > 0 ? Math.round((payouts.filter(p => ['success','paid'].includes(p.status)).length / payouts.length) * 100) : 0}%
              </p>
            </div>
          </div>

          <div className="bg-surface rounded-lg p-6 border border-border mb-6 flex lg:items-center justify-between">
            <label className="text-sm font-600 text-ink mr-4">Filter View Database:</label>
            <div className="flex gap-2 flex-wrap">
              {['all', 'pending', 'paid'].map(status => (
                <button key={status} onClick={() => setFilterStatus(status)}
                  className={`px-4 py-2 rounded-lg font-600 text-sm transition-all ${filterStatus === status ? 'bg-accent text-white' : 'bg-bg text-ink hover:bg-accent-light'}`}>
                  {status.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-surface rounded-lg border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-bg border-b border-border">
                  <tr>
                    <th className="px-6 py-3 text-left">Transaction ID</th>
                    <th className="px-6 py-3 text-left">Internal Type</th>
                    <th className="px-6 py-3 text-left">Disbursed</th>
                    <th className="px-6 py-3 text-left">Payment Signature</th>
                    <th className="px-6 py-3 text-left">Target ID</th>
                    <th className="px-6 py-3 text-left">Current Status</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr><td colSpan="6" className="text-center p-8 text-muted">Awaiting sync...</td></tr>
                  ) : filteredPayouts.length === 0 ? (
                    <tr><td colSpan="6" className="text-center p-8 text-muted">No payout events logged in live cluster.</td></tr>
                  ) : filteredPayouts.map(payout => (
                    <tr key={payout._id} className="border-b border-border hover:bg-bg transition-colors">
                      <td className="px-6 py-4 text-xs font-mono">{payout._id}</td>
                      <td className="px-6 py-4">{payout.type || 'payout'}</td>
                      <td className="px-6 py-4 text-gold font-bold">{formatters.currency(payout.amount)}</td>
                      <td className="px-6 py-4 text-xs font-mono">{payout.razorpayPaymentId || 'N/A'}</td>
                      <td className="px-6 py-4 text-xs font-mono">{payout.userId || 'N/A'}</td>
                      <td className="px-6 py-4"><span className="px-2 py-1 bg-gray-200 text-gray-800 rounded text-xs">{payout.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

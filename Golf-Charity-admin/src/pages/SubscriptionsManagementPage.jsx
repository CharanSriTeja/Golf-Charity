import React, { useState, useEffect } from 'react';
import { AdminSidebar } from '../components/AdminSidebar';
import { adminAPI } from '../api/admin';

export const SubscriptionsManagementPage = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all');
  const [loading, setLoading] = useState(true);

  const fetchSubs = async () => {
    try {
      const res = await adminAPI.getSubscriptions();
      setSubscriptions(res.data.transactions || []);
    } catch(err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubs();
  }, []);

  const filteredSubscriptions = filterStatus === 'all' 
    ? subscriptions 
    : subscriptions.filter(s => s.status === filterStatus);

  const getStatusClass = (status) => {
    switch (status) {
      case 'success':
      case 'active': return 'bg-green-100 text-green-700';
      case 'failed':
      case 'cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="flex min-h-screen bg-bg">
      <AdminSidebar />
      <div className="flex-1 p-10 overflow-auto">
        <div className="flex justify-between items-center mb-10 flex-wrap gap-5">
          <h1 className="text-[32px] font-[700] font-playfair text-ink">Subscriptions & Payments Live</h1>
          <div className="flex gap-2 flex-wrap">
            {['all', 'success', 'pending', 'failed', 'active'].map(status => (
              <button
                key={status}
                className={`px-4 py-2 border border-border bg-surface rounded-md cursor-pointer text-sm transition-all hover:border-accent ${filterStatus === status ? 'bg-accent text-white border-accent' : ''}`}
                onClick={() => setFilterStatus(status)}
              >
                {status.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <div className="bg-surface border border-border rounded-lg p-5 text-center">
            <div className="text-[28px] font-[700] text-accent font-playfair mb-2">{subscriptions.length}</div>
            <div className="text-[13px] text-muted uppercase tracking-wide">Total Logged</div>
          </div>
          <div className="bg-surface border border-border rounded-lg p-5 text-center">
            <div className="text-[28px] font-[700] text-accent font-playfair mb-2">{subscriptions.filter(s => ['active', 'success'].includes(s.status)).length}</div>
            <div className="text-[13px] text-muted uppercase tracking-wide">Successful / Active</div>
          </div>
          <div className="bg-surface border border-border rounded-lg p-5 text-center">
            <div className="text-[28px] font-[700] text-accent font-playfair mb-2">
              ₹{subscriptions.filter(s => ['active', 'success'].includes(s.status)).reduce((a, b) => a + (b.amount || 0), 0).toLocaleString()}
            </div>
            <div className="text-[13px] text-muted uppercase tracking-wide">Gross Captured API</div>
          </div>
        </div>

        <div className="bg-surface border border-border rounded-lg overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="bg-bg border-b-2 border-border">
              <tr>
                <th className="p-4 text-left font-[600] text-ink text-sm">Target ID</th>
                <th className="p-4 text-left font-[600] text-ink text-sm">Entity Type</th>
                <th className="p-4 text-left font-[600] text-ink text-sm">Tier</th>
                <th className="p-4 text-left font-[600] text-ink text-sm">Base Value</th>
                <th className="p-4 text-left font-[600] text-ink text-sm">Logged On</th>
                <th className="p-4 text-left font-[600] text-ink text-sm">Gateway Conf.</th>
                <th className="p-4 text-left font-[600] text-ink text-sm">State</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="7" className="p-6 text-center text-muted">Establishing remote link...</td></tr>
              ) : filteredSubscriptions.length === 0 ? (
                 <tr><td colSpan="7" className="p-6 text-center text-muted">No database transactions map to this filter.</td></tr>
              ) : filteredSubscriptions.map(sub => (
                <tr key={sub._id} className="border-b border-border transition-colors hover:bg-gold-light">
                  <td className="p-4 text-xs font-mono">{sub.userId || 'N/A'}</td>
                  <td className="p-4 text-sm font-semibold capitalize">{sub.type}</td>
                  <td className="p-4 text-sm capitalize">{sub.plan}</td>
                  <td className="p-4 text-sm font-semibold text-gold">₹{(sub.amount || 0).toLocaleString()}</td>
                  <td className="p-4 text-xs text-muted">{new Date(sub.createdAt).toLocaleString()}</td>
                  <td className="p-4 text-xs font-mono">{sub.razorpayPaymentId || sub.razorpayOrderId || 'Pending'}</td>
                  <td className="p-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold capitalize ${getStatusClass(sub.status)}`}>
                      {sub.status}
                    </span>
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

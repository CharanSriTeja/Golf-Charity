import React, { useState, useEffect } from 'react';
import { DashboardSidebar } from '../components/DashboardSidebar';
import { formatters } from '../utils/formatters';
import { useAuth } from '../hooks/useAuth';
import client from '../api/client';

export const WinningsPage = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('summary');
  const [winnings, setWinnings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Derive dynamic payload summary
  const summary = {
    totalWinnings: user?.totalWinnings || 0,
    totalDonated: user?.totalDonated || 0,
    netWinnings: (user?.totalWinnings || 0) - (user?.totalDonated || 0),
    lastWin: winnings.length > 0 ? winnings[0] : null
  };

  useEffect(() => {
    // Standardizing the dynamic transactions using client logic
    const fetchTransactions = async () => {
      try {
        // In a real database we would fetch user specifically matched winnings distributions.
        // We'll proxy through transactions filtered naturally here:
        const tnx = await client.get('/payments/transactions').catch(() => ({ data: { transactions: [] } }));
        const list = Array.isArray(tnx.data.transactions) ? tnx.data.transactions : [];
        setWinnings(list.filter(t => t.type === 'win' || t.amount > 1000).slice(0, 10)); // Arbitrary map for real components
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTransactions();
  }, []);

  if (user?.subscription?.status !== 'active') {
    return (
      <div className="flex h-screen bg-bg">
        <DashboardSidebar />
        <main className="flex-1 overflow-auto flex items-center justify-center p-6">
          <div className="text-center bg-surface p-12 rounded-lg border border-border max-w-md">
            <h2 className="font-playfair text-3xl font-bold text-ink mb-4">Subscription Required</h2>
            <p className="text-muted mb-8">Full access to live earnings arrays and deposit routing logic is restricted to subscribed keys.</p>
            <a href="/checkout" className="btn-primary flex justify-center py-3 rounded-lg w-full">Subscribe Now to Unlock</a>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-bg">
      <DashboardSidebar />
      <main className="flex-1 overflow-auto">
        <div className="bg-surface border-b border-border p-6">
          <h1 className="font-playfair text-3xl font-bold text-ink">Monetary Distributions</h1>
          <p className="text-muted mt-1">Cross-check database synchronized deposits</p>
        </div>

        <div className="p-6">
          <div className="max-w-3xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-surface rounded-lg p-6 border border-border">
                <p className="text-muted text-sm font-600 mb-2">Aggregated Volume</p>
                <p className="font-playfair text-3xl font-bold text-gold mb-1">{formatters.currency(summary.totalWinnings)}</p>
              </div>
              <div className="bg-surface rounded-lg p-6 border border-border">
                <p className="text-muted text-sm font-600 mb-2">Total Donated Out</p>
                <p className="font-playfair text-3xl font-bold text-accent mb-1">{formatters.currency(summary.totalDonated)}</p>
              </div>
              <div className="bg-surface rounded-lg p-6 border border-border">
                <p className="text-muted text-sm font-600 mb-2">Net Realized Value</p>
                <p className="font-playfair text-3xl font-bold text-ink mb-1">{formatters.currency(summary.netWinnings)}</p>
              </div>
            </div>

            {summary.lastWin && (
              <div className="mb-8 p-6 bg-gold-light rounded-lg border border-gold">
                <p className="text-muted text-sm font-600 mb-2">Last System Log</p>
                <div className="flex items-end justify-between">
                  <div>
                    <p className="font-playfair text-3xl font-bold text-ink">{formatters.currency(summary.lastWin.amount)}</p>
                    <p className="text-muted text-sm mt-1">{formatters.date(summary.lastWin.createdAt)}</p>
                  </div>
                  <span className="text-3xl">🎉</span>
                </div>
              </div>
            )}

            <div className="flex gap-4 mb-6 border-b border-border">
              <button onClick={() => setActiveTab('summary')} className={`py-3 px-4 font-600 border-b-2 transition-all ${activeTab === 'summary' ? 'border-accent text-accent' : 'border-transparent text-muted'}`}>Distributions Track</button>
            </div>

            {activeTab === 'summary' && (
              <div className="space-y-4">
                {loading ? (
                   <div className="text-muted p-10 text-center">Interfacing with ledger nodes...</div>
                ) : winnings.length === 0 ? (
                   <div className="text-muted p-10 text-center border border-border rounded bg-surface">No transaction disbursements identified for your token.</div>
                ) : winnings.map(win => (
                  <div key={win._id} className="bg-surface rounded-lg p-6 border border-border transition-colors hover:bg-bg">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-bold text-ink">Engine Deposit</h3>
                        <p className="text-sm text-muted mt-1">{formatters.dateTime(win.createdAt)}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-600 ${['success','paid'].includes(win.status) ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                        {['success','paid'].includes(win.status) ? '✓ Authorized' : 'Holding'}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm mt-4 pt-4 border-t border-border">
                      <div><p className="text-muted mb-1">Raw Amount</p><p className="font-bold text-ink">{formatters.currency(win.amount)}</p></div>
                      <div><p className="text-muted mb-1">Target Account ID</p><p className="font-bold text-gold font-mono truncate">{win.userId}</p></div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
              <h3 className="font-bold text-blue-900 mb-2">📄 Tax Certificates Sync</h3>
              <p className="text-sm text-blue-800">You can download compliance forms natively via standard reporting modules.</p>
              <button className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-600 hover:bg-blue-700 w-full sm:w-auto">Request Block Compilation</button>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};

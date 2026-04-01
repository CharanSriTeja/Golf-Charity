import React, { useState } from 'react';
import { DashboardSidebar } from '../components/DashboardSidebar';
import { formatters } from '../utils/formatters';

export const WinningsPage = () => {
  const [activeTab, setActiveTab] = useState('summary');

  const summary = {
    totalWinnings: 7500,
    totalDonated: 750,
    netWinnings: 6750,
    lastWin: { amount: 2500, date: '2026-01-15', draw: 'January 2026' }
  };

  const winnings = [
    {
      id: '1',
      draw: 'January 2026',
      amount: 2500,
      donated: 250,
      net: 2250,
      date: '2026-01-31',
      status: 'paid',
      paymentDate: '2026-02-05'
    },
    {
      id: '2',
      draw: 'December 2025',
      amount: 3000,
      donated: 300,
      net: 2700,
      date: '2025-12-31',
      status: 'paid',
      paymentDate: '2026-01-10'
    },
    {
      id: '3',
      draw: 'November 2025',
      amount: 2000,
      donated: 200,
      net: 1800,
      date: '2025-11-30',
      status: 'paid',
      paymentDate: '2025-12-08'
    }
  ];

  const donations = [
    {
      id: '1',
      charity: 'Save the Children',
      amount: 250,
      date: '2026-02-05',
      status: 'completed'
    },
    {
      id: '2',
      charity: 'Save the Children',
      amount: 300,
      date: '2026-01-10',
      status: 'completed'
    },
    {
      id: '3',
      charity: 'Save the Children',
      amount: 200,
      date: '2025-12-08',
      status: 'completed'
    }
  ];

  return (
    <div className="flex h-screen bg-bg">
      <DashboardSidebar />
      
      <main className="flex-1 overflow-auto">
        {/* Top Bar */}
        <div className="bg-surface border-b border-border p-6">
          <h1 className="font-playfair text-3xl font-bold text-ink">Winnings</h1>
          <p className="text-muted mt-1">Track your prizes and donations</p>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="max-w-3xl">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-surface rounded-lg p-6 border border-border">
                <p className="text-muted text-sm font-600 mb-2">Total Winnings</p>
                <p className="font-playfair text-3xl font-bold text-gold mb-1">
                  {formatters.currency(summary.totalWinnings)}
                </p>
                <p className="text-xs text-muted">Lifetime earnings</p>
              </div>

              <div className="bg-surface rounded-lg p-6 border border-border">
                <p className="text-muted text-sm font-600 mb-2">Total Donated</p>
                <p className="font-playfair text-3xl font-bold text-accent mb-1">
                  {formatters.currency(summary.totalDonated)}
                </p>
                <p className="text-xs text-muted">To selected charities</p>
              </div>

              <div className="bg-surface rounded-lg p-6 border border-border">
                <p className="text-muted text-sm font-600 mb-2">Net Winnings</p>
                <p className="font-playfair text-3xl font-bold text-ink mb-1">
                  {formatters.currency(summary.netWinnings)}
                </p>
                <p className="text-xs text-muted">After donations</p>
              </div>
            </div>

            {/* Last Win */}
            {summary.lastWin && (
              <div className="mb-8 p-6 bg-gold-light rounded-lg border border-gold">
                <p className="text-muted text-sm font-600 mb-2">Latest Win</p>
                <div className="flex items-end justify-between">
                  <div>
                    <p className="font-playfair text-3xl font-bold text-ink">
                      {formatters.currency(summary.lastWin.amount)}
                    </p>
                    <p className="text-muted text-sm mt-1">
                      {summary.lastWin.draw} • {formatters.date(summary.lastWin.date)}
                    </p>
                  </div>
                  <span className="text-3xl">🎉</span>
                </div>
              </div>
            )}

            {/* Tabs */}
            <div className="flex gap-4 mb-6 border-b border-border">
              <button
                onClick={() => setActiveTab('summary')}
                className={`py-3 px-4 font-600 border-b-2 transition-all ${
                  activeTab === 'summary'
                    ? 'border-accent text-accent'
                    : 'border-transparent text-muted hover:text-ink'
                }`}
              >
                Prize History
              </button>
              <button
                onClick={() => setActiveTab('donations')}
                className={`py-3 px-4 font-600 border-b-2 transition-all ${
                  activeTab === 'donations'
                    ? 'border-accent text-accent'
                    : 'border-transparent text-muted hover:text-ink'
                }`}
              >
                Donations
              </button>
            </div>

            {/* Prize History */}
            {activeTab === 'summary' && (
              <div className="space-y-4">
                {winnings.map(win => (
                  <div key={win.id} className="bg-surface rounded-lg p-6 border border-border">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-bold text-ink">{win.draw}</h3>
                        <p className="text-sm text-muted mt-1">
                          {formatters.dateTime(win.date)}
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-600 ${
                        win.status === 'paid'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {win.status === 'paid' ? '✓ Paid' : 'Pending'}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-muted mb-1">Prize Amount</p>
                        <p className="font-bold text-ink">{formatters.currency(win.amount)}</p>
                      </div>
                      <div>
                        <p className="text-muted mb-1">Donated</p>
                        <p className="font-bold text-accent">{formatters.currency(win.donated)}</p>
                      </div>
                      <div>
                        <p className="text-muted mb-1">Net to Account</p>
                        <p className="font-bold text-gold">{formatters.currency(win.net)}</p>
                      </div>
                    </div>

                    {win.status === 'paid' && (
                      <p className="text-xs text-muted mt-3 pt-3 border-t border-border">
                        Transferred on {formatters.date(win.paymentDate)}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Donations */}
            {activeTab === 'donations' && (
              <div className="space-y-4">
                {donations.map(donation => (
                  <div key={donation.id} className="bg-surface rounded-lg p-6 border border-border">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-bold text-ink">{donation.charity}</h3>
                        <p className="text-sm text-muted mt-1">
                          {formatters.dateTime(donation.date)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-accent text-lg">
                          {formatters.currency(donation.amount)}
                        </p>
                        <span className="text-xs text-green-600 font-600">✓ Completed</span>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Tax Receipt Info */}
                <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
                  <h3 className="font-bold text-blue-900 mb-2">📄 Tax Receipts</h3>
                  <p className="text-sm text-blue-800">
                    You can download tax receipts for all your donations. Charities will send TDS certificates annually.
                  </p>
                  <button className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-600 hover:bg-blue-700">
                    Download Receipts
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

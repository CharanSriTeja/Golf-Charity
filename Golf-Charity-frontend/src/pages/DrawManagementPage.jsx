import React, { useState } from 'react';
import { AdminSidebar } from '../components/AdminSidebar';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { formatters } from '../utils/formatters';

export const DrawManagementPage = () => {
  const [activeTab, setActiveTab] = useState('current');
  const [showCreateDraw, setShowCreateDraw] = useState(false);
  const [selectedDraw, setSelectedDraw] = useState(null);

  const mockDraws = [
    {
      id: '1',
      month: 'March 2026',
      status: 'active',
      prizePool: 50000,
      participants: 1250,
      publishedWinners: null,
      deadline: '2026-03-31T20:00:00'
    },
    {
      id: '2',
      month: 'February 2026',
      status: 'published',
      prizePool: 45000,
      participants: 1180,
      publishedWinners: [15, 32, 8, 42, 5],
      deadline: '2026-02-28T20:00:00'
    }
  ];

  const currentDraw = mockDraws[0];

  const handlePublishDraw = (drawId) => {
    // TODO: Call API to publish draw
    console.log('Publish draw:', drawId);
  };

  return (
    <div className="flex h-screen bg-bg">
      <AdminSidebar />
      
      <main className="flex-1 overflow-auto">
        {/* Top Bar */}
        <div className="bg-surface border-b border-border p-6 flex items-center justify-between">
          <div>
            <h1 className="font-playfair text-3xl font-bold text-ink">Draw Management</h1>
            <p className="text-muted mt-1">Create and manage monthly draws</p>
          </div>
          <Button onClick={() => setShowCreateDraw(true)}>
            Create New Draw
          </Button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Tabs */}
          <div className="flex gap-4 mb-6 border-b border-border">
            <button
              onClick={() => setActiveTab('current')}
              className={`py-3 px-4 font-600 border-b-2 transition-all ${
                activeTab === 'current'
                  ? 'border-accent text-accent'
                  : 'border-transparent text-muted hover:text-ink'
              }`}
            >
              Current Draw
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`py-3 px-4 font-600 border-b-2 transition-all ${
                activeTab === 'history'
                  ? 'border-accent text-accent'
                  : 'border-transparent text-muted hover:text-ink'
              }`}
            >
              History
            </button>
          </div>

          {/* Current Draw */}
          {activeTab === 'current' && (
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-accent-light to-bg rounded-lg p-8 border border-accent">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="font-playfair text-3xl font-bold text-ink mb-2">
                      {currentDraw.month}
                    </h2>
                    <p className="text-muted">Active monthly draw</p>
                  </div>
                  <span className="px-4 py-2 bg-green-100 text-green-700 font-600 rounded-full text-sm">
                    Active
                  </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                  <div className="p-4 bg-white rounded-lg border border-border">
                    <p className="text-muted text-sm mb-1">Prize Pool</p>
                    <p className="font-playfair text-2xl font-bold text-gold">
                      {formatters.currency(currentDraw.prizePool)}
                    </p>
                  </div>
                  <div className="p-4 bg-white rounded-lg border border-border">
                    <p className="text-muted text-sm mb-1">Participants</p>
                    <p className="font-playfair text-2xl font-bold text-accent">
                      {currentDraw.participants.toLocaleString()}
                    </p>
                  </div>
                  <div className="p-4 bg-white rounded-lg border border-border">
                    <p className="text-muted text-sm mb-1">Deadline</p>
                    <p className="font-playfair text-xl font-bold text-ink">
                      {formatters.date(currentDraw.deadline)}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button onClick={() => setSelectedDraw(currentDraw)}>
                    Manage Draw
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handlePublishDraw(currentDraw.id)}
                  >
                    Publish Winners
                  </Button>
                </div>
              </div>

              {/* Draw Instructions */}
              <div className="bg-surface rounded-lg p-6 border border-border">
                <h3 className="font-playfair font-bold text-ink mb-4">Steps to Publish Draw</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex gap-3">
                    <span className="text-lg">1️⃣</span>
                    <p>Wait until draw deadline passes</p>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-lg">2️⃣</span>
                    <p>Review all qualified participants</p>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-lg">3️⃣</span>
                    <p>Generate winning numbers using the simulator</p>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-lg">4️⃣</span>
                    <p>Publish winners and trigger notifications</p>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-lg">5️⃣</span>
                    <p>Verify and process payouts</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* History */}
          {activeTab === 'history' && (
            <div className="space-y-4">
              {mockDraws.filter(d => d.status === 'published').map(draw => (
                <div key={draw.id} className="bg-surface rounded-lg p-6 border border-border">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-playfair text-xl font-bold text-ink">
                        {draw.month}
                      </h3>
                      <p className="text-sm text-muted mt-1">
                        Deadline: {formatters.date(draw.deadline)}
                      </p>
                    </div>
                    <span className="px-3 py-1 bg-gray-200 text-gray-700 font-600 rounded-full text-xs">
                      Published
                    </span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4 text-sm">
                    <div>
                      <p className="text-muted text-xs mb-1">Prize Pool</p>
                      <p className="font-bold text-ink">{formatters.currency(draw.prizePool)}</p>
                    </div>
                    <div>
                      <p className="text-muted text-xs mb-1">Participants</p>
                      <p className="font-bold text-ink">{draw.participants.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-muted text-xs mb-1">Winning Numbers</p>
                      <div className="flex gap-1 flex-wrap">
                        {draw.publishedWinners && draw.publishedWinners.slice(0, 3).map(num => (
                          <span key={num} className="px-2 py-1 bg-gold-light text-gold font-bold rounded text-xs">
                            {num}
                          </span>
                        ))}
                        {draw.publishedWinners && draw.publishedWinners.length > 3 && (
                          <span className="px-2 py-1 text-muted text-xs">
                            +{draw.publishedWinners.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedDraw(draw)}
                    className="px-4 py-2 rounded-lg bg-bg text-ink font-600 hover:bg-opacity-80"
                  >
                    View Details
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Draw Details Modal */}
          {selectedDraw && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-surface rounded-lg p-8 max-w-2xl w-full max-h-96 overflow-y-auto">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-playfair text-2xl font-bold text-ink">
                    {selectedDraw.month} Draw Details
                  </h2>
                  <button
                    onClick={() => setSelectedDraw(null)}
                    className="text-ink hover:text-muted text-2xl"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted mb-1">Status</p>
                      <p className="font-600 text-ink">{selectedDraw.status}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted mb-1">Prize Pool</p>
                      <p className="font-600 text-gold">{formatters.currency(selectedDraw.prizePool)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted mb-1">Participants</p>
                      <p className="font-600 text-ink">{selectedDraw.participants}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted mb-1">Deadline</p>
                      <p className="font-600 text-ink">{formatters.date(selectedDraw.deadline)}</p>
                    </div>
                  </div>

                  {selectedDraw.publishedWinners && (
                    <div>
                      <p className="text-sm text-muted mb-2">Winning Numbers</p>
                      <div className="flex gap-2 flex-wrap">
                        {selectedDraw.publishedWinners.map(num => (
                          <span key={num} className="px-3 py-1 bg-gold-light text-gold font-bold rounded text-sm">
                            {num}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => setSelectedDraw(null)}
                  className="w-full px-4 py-2 rounded-lg bg-accent text-white font-600 hover:bg-opacity-90"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

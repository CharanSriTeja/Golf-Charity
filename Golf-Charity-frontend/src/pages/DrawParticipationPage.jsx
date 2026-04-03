import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { DashboardSidebar } from '../components/DashboardSidebar';
import { formatters } from '../utils/formatters';
import { drawsAPI } from '../api/draws';
import { LoadingSpinner } from '../components/LoadingSpinner';

export const DrawParticipationPage = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('current');
  const [currentDraw, setCurrentDraw] = useState(null);
  const [pastDraws, setPastDraws] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDraws = async () => {
      try {
        const [activeRes, historyRes] = await Promise.all([
          drawsAPI.getCurrent().catch(() => ({ data: { draw: null } })),
          drawsAPI.getHistory().catch(() => ({ data: { draws: [] } }))
        ]);
        setCurrentDraw(activeRes.data.draw);
        const allDraws = historyRes.data.draws || historyRes.data || [];
        // Only show passed draws or completed ones
        setPastDraws(allDraws.filter(d => d.status === 'completed' || d.status === 'drawn'));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (user?.subscription?.status === 'active') {
      fetchDraws();
    }
  }, [user]);

  // Gate content logically
  if (user?.subscription?.status !== 'active') {
    return (
      <div className="flex h-screen bg-bg">
        <DashboardSidebar />
        <main className="flex-1 overflow-auto flex items-center justify-center p-6">
          <div className="text-center bg-surface p-12 rounded-lg border border-border max-w-md">
            <h2 className="font-playfair text-3xl font-bold text-ink mb-4">Subscription Required</h2>
            <p className="text-muted mb-8">Live entry mapping and interaction with Monthly Draws is disabled for unverified accounts.</p>
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
          <h1 className="font-playfair text-3xl font-bold text-ink">Draw Logic Sync</h1>
          <p className="text-muted mt-1">Access monthly live draws mapped to your credentials</p>
        </div>

        <div className="p-6">
          <div className="max-w-3xl">
            <div className="flex gap-4 mb-6 border-b border-border">
              <button onClick={() => setActiveTab('current')} className={`py-3 px-4 font-600 border-b-2 transition-all ${activeTab === 'current' ? 'border-accent text-accent' : 'border-transparent text-muted hover:text-ink'}`}>Live Active Cycle</button>
              <button onClick={() => setActiveTab('past')} className={`py-3 px-4 font-600 border-b-2 transition-all ${activeTab === 'past' ? 'border-accent text-accent' : 'border-transparent text-muted hover:text-ink'}`}>Historical Resolution</button>
            </div>

            {loading ? (
              <div className="py-20 flex justify-center"><LoadingSpinner /></div>
            ) : activeTab === 'current' ? (
              <div className="space-y-6">
                {currentDraw ? (
                  <div className="bg-gradient-to-br from-accent-light to-bg rounded-lg p-8 border border-accent">
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <h2 className="font-playfair text-3xl font-bold text-ink mb-2">{currentDraw.month}</h2>
                        <p className="text-muted">Target configuration index loaded.</p>
                      </div>
                      <span className="px-4 py-2 bg-green-100 text-green-700 font-600 rounded-full text-sm">Synchronizing</span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="p-4 bg-white rounded-lg border border-border">
                        <p className="text-muted text-sm mb-1">Generated Liquidity Pool</p>
                        <p className="font-playfair text-2xl font-bold text-gold">{formatters.currency(currentDraw.prizePool)}</p>
                      </div>
                      <div className="p-4 bg-white rounded-lg border border-border">
                        <p className="text-muted text-sm mb-1">Tracked Registered Participants</p>
                        <p className="font-playfair text-2xl font-bold text-accent">{(currentDraw.participants?.length || 0).toLocaleString()}</p>
                      </div>
                    </div>

                    <div className="mb-6">
                      <p className="text-muted text-sm font-600 mb-3">User Node Qualifications</p>
                      <div className="p-4 bg-gold-light border border-gold rounded text-ink text-sm">
                        You have {user.scores && user.scores.length > 0 ? 'an active calculation index assigned' : 'no scores indexed explicitly, meaning null entry pool assignment'}. Make sure your Stableford data is synced in the Scores panel before the system lock date!
                      </div>
                    </div>

                    <div className="p-4 bg-white rounded-lg border border-border">
                      <p className="text-muted text-sm mb-2">Cycle Expiration Block Threshold</p>
                      <p className="font-bold text-ink text-lg">{formatters.dateTime(currentDraw.deadline)}</p>
                      <p className="text-xs text-muted mt-2">No calculations will be validated past this timestamp globally.</p>
                    </div>
                  </div>
                ) : (
                  <div className="p-10 border border-border border-dashed rounded text-center text-muted">No configuration cycles found mapped to the active cluster. Standby for genesis trigger.</div>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                {pastDraws.length > 0 ? pastDraws.map(draw => {
                  const userWon = draw.winners?.some(w => String(w.userId) === String(user._id || user.id));
                  return (
                    <div key={draw._id} className={`p-6 rounded-lg border transition-all ${userWon ? 'bg-gold-light border-gold' : 'bg-surface border-border'}`}>
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="font-playfair text-xl font-bold text-ink">{draw.month}</h3>
                          {userWon && <p className="text-sm text-gold font-600 mt-1">🏆 Payload hit targeted</p>}
                        </div>
                        <span className="px-3 py-1 bg-gray-200 text-gray-700 font-600 rounded-full text-xs">Closed Cycle</span>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                        <div><p className="text-muted text-xs mb-1">Distributed Pool</p><p className="font-bold text-ink">{formatters.currency(draw.prizePool)}</p></div>
                        <div><p className="text-muted text-xs mb-1">Participation Hash</p><p className="font-bold text-ink">{(draw.participants?.length || 0).toLocaleString()}</p></div>
                        <div><p className="text-muted text-xs mb-1">Validated Numbers Count</p><p className="font-bold text-ink">{draw.winningNumbers?.length || 0}</p></div>
                      </div>
                    </div>
                  )
                }) : (
                  <div className="p-10 border border-border border-dashed rounded text-center text-muted">Awaiting historical cluster synchronization payloads...</div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

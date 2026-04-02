import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { DashboardSidebar } from '../components/DashboardSidebar';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { formatters } from '../utils/formatters';
import { drawsAPI } from '../api/draws';

export const DashboardPage = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    averageScore: 0,
    totalDraws: 0,
    winnings: 0,
    charity: null
  });
  const [activeDraw, setActiveDraw] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRealData = async () => {
      try {
        const client = (await import('../api/client')).default;
        const [activeDrawRes, historyRes, profileRes] = await Promise.all([
          drawsAPI.getCurrent().catch(() => ({ data: { draw: null } })),
          drawsAPI.getHistory().catch(() => ({ data: { draws: [] } })),
          client.get('/users/profile').catch(() => ({ data: { user: user } }))
        ]);
        
        setActiveDraw(activeDrawRes.data.draw || null);
        const allDraws = historyRes.data.draws || historyRes.data || [];
        const fullUser = profileRes.data.user || user;

        setStats({
          averageScore: fullUser?.scores?.length > 0 ? Math.round(fullUser.scores.reduce((a, b) => a + (b.stablefordPoints || 0), 0) / fullUser.scores.length) : '-',
          totalDraws: allDraws.length,
          winnings: fullUser?.totalWinnings || 0,
          charity: fullUser?.charityId && typeof fullUser.charityId === 'object' ? fullUser.charityId : { name: 'None Selected', icon: '❤️' }
        });
      } catch (err) {
        console.error('Failed to load dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };
    if (user) fetchRealData();
  }, [user]);

  return (
    <div className="flex h-screen bg-bg">
      <DashboardSidebar />
      
      <main className="flex-1 overflow-auto">
        <div className="bg-surface border-b border-border p-6">
          <h1 className="font-playfair text-3xl font-bold text-ink">Dashboard</h1>
          <p className="text-muted mt-1">Welcome back, {user?.name}!</p>
        </div>

        <div className="p-6">
          {loading ? (
            <div className="flex items-center justify-center h-96">
              <LoadingSpinner />
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-surface rounded-lg p-6 border border-border hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-muted text-sm font-600">Average Score</p>
                    <span className="text-2xl">⛳</span>
                  </div>
                  <p className="font-playfair text-4xl font-bold text-accent mb-1">{stats.averageScore}</p>
                  <p className="text-xs text-muted">Stableford Points</p>
                </div>

                <div className="bg-surface rounded-lg p-6 border border-border hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-muted text-sm font-600">Total Live Draws</p>
                    <span className="text-2xl">🎰</span>
                  </div>
                  <p className="font-playfair text-4xl font-bold text-accent mb-1">{stats.totalDraws}</p>
                  <p className="text-xs text-muted">Platform hosted</p>
                </div>

                <div className="bg-surface rounded-lg p-6 border border-border hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-muted text-sm font-600">Total Winnings</p>
                    <span className="text-2xl">🏆</span>
                  </div>
                  <p className="font-playfair text-4xl font-bold text-gold mb-1">{formatters.currency(stats.winnings)}</p>
                  <p className="text-xs text-muted">Lifetime earnings</p>
                </div>

                <div className="bg-surface rounded-lg p-6 border border-border hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-muted text-sm font-600">Selected Charity Support</p>
                    <span className="text-2xl">❤️</span>
                  </div>
                  <p className="font-playfair text-lg font-bold text-ink mb-1 truncate">{stats.charity?.name || 'Supporting all'}</p>
                  <p className="text-xs text-muted">10% of winnings automated</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-surface rounded-lg p-6 border border-border flex flex-col items-center justify-center py-10 opacity-70">
                  <h2 className="font-playfair text-xl font-bold text-ink mb-4">📊 Score Sync Active</h2>
                  <p className="text-sm text-center text-muted max-w-sm mb-4">PlayGiveWin will automatically link your WHS handicap scores upon verification to generate Stableford mappings natively. Ensure your external data matches your registration constraints.</p>
                  <button className="px-5 py-2 rounded bg-accent text-white font-600 hover:bg-opacity-90">Manage Linked Associations</button>
                </div>

                <div className="bg-surface rounded-lg p-6 border border-border">
                  <h2 className="font-playfair text-xl font-bold text-ink mb-4">🎰 Next Up: Live Current Draw</h2>
                  {activeDraw ? (
                    <div className="space-y-4">
                      <div>
                        <p className="text-muted text-sm mb-1">Month Event Code</p>
                        <p className="font-bold text-ink text-lg">{activeDraw.month || 'Current Active Cycle'}</p>
                      </div>
                      <div>
                        <p className="text-muted text-sm mb-1">Current Prize Pool Tracking</p>
                        <p className="font-bold text-gold text-2xl">{formatters.currency(activeDraw.prizePool)}</p>
                      </div>
                      <div className="pt-4 border-t border-border">
                        <p className="text-muted text-sm mb-2">Draw Closing Deadline Timer</p>
                        <p className="font-bold text-ink">{formatters.date(activeDraw.deadline) || 'Pending configuration'}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="p-8 flex flex-col items-center justify-center text-center bg-surface border border-dashed border-border rounded-lg h-full">
                      <span className="text-4xl mb-3">⏳</span>
                      <h3 className="font-playfair text-xl font-bold text-ink mb-2">No Active Draw</h3>
                      <p className="text-muted text-sm max-w-sm">There are currently no active draws running on the platform. We will notify you when the next monthly contest begins.</p>
                    </div>
                  )}
                  <button className="w-full mt-6 py-2 px-4 rounded-lg bg-accent text-white font-600 hover:bg-opacity-90 transition-all">Review Live Ticket Details</button>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

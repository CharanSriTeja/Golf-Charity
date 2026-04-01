import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { DashboardSidebar } from '../components/DashboardSidebar';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { formatters } from '../utils/formatters';

export const DashboardPage = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    averageScore: 0,
    totalDraws: 0,
    winnings: 0,
    charity: null
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Fetch real data from API
    setTimeout(() => {
      setStats({
        averageScore: 24,
        totalDraws: 12,
        winnings: 5000,
        charity: { name: 'Save the Children', icon: '🤝' }
      });
      setLoading(false);
    }, 500);
  }, []);

  return (
    <div className="flex h-screen bg-bg">
      <DashboardSidebar />
      
      <main className="flex-1 overflow-auto">
        {/* Top Bar */}
        <div className="bg-surface border-b border-border p-6">
          <h1 className="font-playfair text-3xl font-bold text-ink">Dashboard</h1>
          <p className="text-muted mt-1">Welcome back, {user?.name}!</p>
        </div>

        {/* Content */}
        <div className="p-6">
          {loading ? (
            <div className="flex items-center justify-center h-96">
              <LoadingSpinner />
            </div>
          ) : (
            <>
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {/* Average Score */}
                <div className="bg-surface rounded-lg p-6 border border-border hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-muted text-sm font-600">Average Score</p>
                    <span className="text-2xl">⛳</span>
                  </div>
                  <p className="font-playfair text-4xl font-bold text-accent mb-1">
                    {stats.averageScore}
                  </p>
                  <p className="text-xs text-muted">Out of 45 (Stableford)</p>
                </div>

                {/* Total Draws */}
                <div className="bg-surface rounded-lg p-6 border border-border hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-muted text-sm font-600">Draws Participated</p>
                    <span className="text-2xl">🎰</span>
                  </div>
                  <p className="font-playfair text-4xl font-bold text-accent mb-1">
                    {stats.totalDraws}
                  </p>
                  <p className="text-xs text-muted">Monthly draws</p>
                </div>

                {/* Winnings */}
                <div className="bg-surface rounded-lg p-6 border border-border hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-muted text-sm font-600">Total Winnings</p>
                    <span className="text-2xl">🏆</span>
                  </div>
                  <p className="font-playfair text-4xl font-bold text-gold mb-1">
                    {formatters.currency(stats.winnings)}
                  </p>
                  <p className="text-xs text-muted">Lifetime earnings</p>
                </div>

                {/* Charity */}
                <div className="bg-surface rounded-lg p-6 border border-border hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-muted text-sm font-600">Selected Charity</p>
                    <span className="text-2xl">❤️</span>
                  </div>
                  <p className="font-playfair text-lg font-bold text-ink mb-1">
                    {stats.charity?.name || 'Not selected'}
                  </p>
                  <p className="text-xs text-muted">10% of winnings donated</p>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Recent Scores */}
                <div className="bg-surface rounded-lg p-6 border border-border">
                  <h2 className="font-playfair text-xl font-bold text-ink mb-4">
                    📊 Recent Scores
                  </h2>
                  <div className="space-y-3">
                    {[28, 26, 24, 22, 20].map((score, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 bg-accent-light rounded-lg">
                        <span className="text-sm text-muted">Week {5 - idx}</span>
                        <span className="font-bold text-ink">{score}</span>
                      </div>
                    ))}
                  </div>
                  <button className="w-full mt-4 py-2 px-4 rounded-lg bg-accent text-white font-600 hover:bg-opacity-90 transition-all">
                    Add New Score
                  </button>
                </div>

                {/* Upcoming Draw */}
                <div className="bg-surface rounded-lg p-6 border border-border">
                  <h2 className="font-playfair text-xl font-bold text-ink mb-4">
                    🎰 Current Draw
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <p className="text-muted text-sm mb-1">Month</p>
                      <p className="font-bold text-ink text-lg">March 2026</p>
                    </div>
                    <div>
                      <p className="text-muted text-sm mb-1">Your Qualified Numbers</p>
                      <div className="flex gap-2 flex-wrap">
                        {[5, 12, 18, 25, 32].map(num => (
                          <span key={num} className="px-3 py-1 bg-gold-light text-ink font-600 rounded-full text-sm">
                            {num}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="pt-4 border-t border-border">
                      <p className="text-muted text-sm mb-2">Draw Deadline</p>
                      <p className="font-bold text-ink">March 31, 2026 @ 8:00 PM</p>
                    </div>
                  </div>
                  <button className="w-full mt-4 py-2 px-4 rounded-lg bg-accent text-white font-600 hover:bg-opacity-90 transition-all">
                    View All Draws
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

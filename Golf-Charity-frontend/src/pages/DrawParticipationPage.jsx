import React, { useState } from 'react';
import { DashboardSidebar } from '../components/DashboardSidebar';
import { formatters } from '../utils/formatters';

export const DrawParticipationPage = () => {
  const [activeTab, setActiveTab] = useState('current');

  const currentDraw = {
    id: '1',
    month: 'March 2026',
    deadline: '2026-03-31T20:00:00',
    prizePool: 50000,
    participants: 1250,
    qualifiedNumbers: [5, 12, 18, 25, 32],
    status: 'active'
  };

  const pastDraws = [
    {
      id: '2',
      month: 'February 2026',
      prizePool: 45000,
      participants: 1180,
      winningNumber: 15,
      userWon: false,
      status: 'completed'
    },
    {
      id: '3',
      month: 'January 2026',
      prizePool: 40000,
      participants: 980,
      winningNumber: 8,
      userWon: true,
      prize: 2500,
      status: 'completed'
    }
  ];

  return (
    <div className="flex h-screen bg-bg">
      <DashboardSidebar />
      
      <main className="flex-1 overflow-auto">
        {/* Top Bar */}
        <div className="bg-surface border-b border-border p-6">
          <h1 className="font-playfair text-3xl font-bold text-ink">Draw Participation</h1>
          <p className="text-muted mt-1">View current and past draws</p>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="max-w-3xl">
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
                onClick={() => setActiveTab('past')}
                className={`py-3 px-4 font-600 border-b-2 transition-all ${
                  activeTab === 'past'
                    ? 'border-accent text-accent'
                    : 'border-transparent text-muted hover:text-ink'
                }`}
              >
                Past Draws
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
                      <p className="text-muted">Active draw with eligible numbers</p>
                    </div>
                    <span className="px-4 py-2 bg-green-100 text-green-700 font-600 rounded-full text-sm">
                      Active
                    </span>
                  </div>

                  {/* Prize Pool */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="p-4 bg-white rounded-lg border border-border">
                      <p className="text-muted text-sm mb-1">Prize Pool</p>
                      <p className="font-playfair text-2xl font-bold text-gold">
                        {formatters.currency(currentDraw.prizePool)}
                      </p>
                    </div>
                    <div className="p-4 bg-white rounded-lg border border-border">
                      <p className="text-muted text-sm mb-1">Total Participants</p>
                      <p className="font-playfair text-2xl font-bold text-accent">
                        {currentDraw.participants.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* Qualified Numbers */}
                  <div className="mb-6">
                    <p className="text-muted text-sm font-600 mb-3">Your Qualified Numbers</p>
                    <div className="flex gap-2 flex-wrap">
                      {currentDraw.qualifiedNumbers.map(num => (
                        <div
                          key={num}
                          className="px-4 py-2 bg-gold-light border border-gold rounded-full font-bold text-ink"
                        >
                          {num}
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-muted mt-3">
                      Numbers are based on your average score (24 points → qualified for 5 draws)
                    </p>
                  </div>

                  {/* Countdown */}
                  <div className="p-4 bg-white rounded-lg border border-border">
                    <p className="text-muted text-sm mb-2">Draw Deadline</p>
                    <p className="font-bold text-ink text-lg">
                      {formatters.dateTime(currentDraw.deadline)}
                    </p>
                    <p className="text-xs text-muted mt-2">
                      Scores submitted until this date will be included
                    </p>
                  </div>
                </div>

                {/* How It Works */}
                <div className="bg-surface rounded-lg p-6 border border-border">
                  <h3 className="font-playfair font-bold text-ink mb-4">How Your Numbers Are Generated</h3>
                  <div className="space-y-3 text-sm text-muted">
                    <div className="flex gap-3">
                      <span className="text-lg">1️⃣</span>
                      <p>Your average Stableford score qualifies you for a draw position (1-50)</p>
                    </div>
                    <div className="flex gap-3">
                      <span className="text-lg">2️⃣</span>
                      <p>Each qualified draw generates 5 random numbers (1-50)</p>
                    </div>
                    <div className="flex gap-3">
                      <span className="text-lg">3️⃣</span>
                      <p>If your position matches, you win a share of the prize pool</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Past Draws */}
            {activeTab === 'past' && (
              <div className="space-y-4">
                {pastDraws.map(draw => (
                  <div
                    key={draw.id}
                    className={`p-6 rounded-lg border transition-all ${
                      draw.userWon
                        ? 'bg-gold-light border-gold'
                        : 'bg-surface border-border'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-playfair text-xl font-bold text-ink">
                          {draw.month}
                        </h3>
                        {draw.userWon && (
                          <p className="text-sm text-gold font-600 mt-1">🏆 You won!</p>
                        )}
                      </div>
                      <span className="px-3 py-1 bg-gray-200 text-gray-700 font-600 rounded-full text-xs">
                        Completed
                      </span>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                      <div>
                        <p className="text-muted text-xs mb-1">Prize Pool</p>
                        <p className="font-bold text-ink">{formatters.currency(draw.prizePool)}</p>
                      </div>
                      <div>
                        <p className="text-muted text-xs mb-1">Participants</p>
                        <p className="font-bold text-ink">{draw.participants.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-muted text-xs mb-1">Winning Number</p>
                        <p className="font-bold text-ink">{draw.winningNumber}</p>
                      </div>
                      {draw.userWon && (
                        <div>
                          <p className="text-muted text-xs mb-1">Your Prize</p>
                          <p className="font-bold text-gold">{formatters.currency(draw.prize)}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

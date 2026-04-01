import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { DashboardSidebar } from '../components/DashboardSidebar';
import { Button } from '../components/Button';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { DONATION_PERCENTAGE_RANGE } from '../utils/constants';

export const MyCharityPage = () => {
  const { user, updateUser } = useAuth();
  const [charities, setCharities] = useState([
    { id: '1', name: 'Save the Children', description: 'Working to improve child welfare globally', icon: '🤝' },
    { id: '2', name: 'Wildlife Trust India', description: 'Protecting India\'s wildlife and forests', icon: '🦁' },
    { id: '3', name: 'Clean India Initiative', description: 'Promoting sanitation and clean water', icon: '💧' },
    { id: '4', name: 'Education for All', description: 'Providing quality education to underprivileged', icon: '📚' }
  ]);
  const [selectedCharity, setSelectedCharity] = useState(user?.charity || null);
  const [donationPercentage, setDonationPercentage] = useState(10);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const currentCharity = charities.find(c => c.id === selectedCharity);

  const handleSave = async () => {
    setLoading(true);
    try {
      // TODO: Call API to update charity
      await new Promise(resolve => setTimeout(resolve, 500));
      updateUser({ ...user, charity: selectedCharity });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-bg">
      <DashboardSidebar />
      
      <main className="flex-1 overflow-auto">
        {/* Top Bar */}
        <div className="bg-surface border-b border-border p-6">
          <h1 className="font-playfair text-3xl font-bold text-ink">My Charity</h1>
          <p className="text-muted mt-1">Select and manage your charity donation</p>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="max-w-3xl">
            {/* Success Message */}
            {success && (
              <div className="mb-6 p-4 rounded-lg bg-green-50 border border-green-200">
                <p className="text-sm text-green-700">✓ Charity updated successfully!</p>
              </div>
            )}

            {/* Current Selection */}
            {currentCharity && (
              <div className="mb-8 p-6 bg-gradient-to-br from-accent-light to-bg rounded-lg border border-accent">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted font-600 mb-2">Currently Supporting</p>
                    <div className="flex items-center gap-3">
                      <span className="text-4xl">{currentCharity.icon}</span>
                      <div>
                        <h2 className="font-playfair text-2xl font-bold text-ink">{currentCharity.name}</h2>
                        <p className="text-muted text-sm mt-1">{currentCharity.description}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Donation Stats */}
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="p-4 bg-white rounded-lg border border-border">
                    <p className="text-muted text-sm mb-1">Donation Percentage</p>
                    <p className="font-playfair text-3xl font-bold text-accent">{donationPercentage}%</p>
                  </div>
                  <div className="p-4 bg-white rounded-lg border border-border">
                    <p className="text-muted text-sm mb-1">Total Donated</p>
                    <p className="font-playfair text-3xl font-bold text-gold">₹500</p>
                  </div>
                </div>
              </div>
            )}

            {/* Donation Percentage Slider */}
            <div className="mb-8 bg-surface rounded-lg p-6 border border-border">
              <h2 className="font-playfair text-lg font-bold text-ink mb-4">Set Donation Percentage</h2>
              <p className="text-muted text-sm mb-4">
                Choose what percentage of your winnings goes to your selected charity
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-ink font-600">{donationPercentage}%</span>
                  <span className="text-muted text-sm">of winnings</span>
                </div>
                <input
                  type="range"
                  min={DONATION_PERCENTAGE_RANGE.MIN}
                  max={DONATION_PERCENTAGE_RANGE.MAX}
                  value={donationPercentage}
                  onChange={(e) => setDonationPercentage(Number(e.target.value))}
                  className="w-full h-2 bg-accent-light rounded-lg appearance-none cursor-pointer accent-accent"
                />
                <div className="flex justify-between text-xs text-muted">
                  <span>{DONATION_PERCENTAGE_RANGE.MIN}%</span>
                  <span>{DONATION_PERCENTAGE_RANGE.MAX}%</span>
                </div>
              </div>
            </div>

            {/* Charity Selection */}
            <div className="bg-surface rounded-lg p-6 border border-border">
              <h2 className="font-playfair text-lg font-bold text-ink mb-6">Select Your Charity</h2>
              
              <div className="grid grid-cols-1 gap-4 mb-8">
                {charities.map(charity => (
                  <button
                    key={charity.id}
                    onClick={() => setSelectedCharity(charity.id)}
                    className={`
                      p-4 rounded-lg border-2 transition-all text-left
                      ${selectedCharity === charity.id
                        ? 'border-accent bg-accent-light'
                        : 'border-border hover:border-accent-light'
                      }
                    `}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-3xl">{charity.icon}</span>
                      <div className="flex-1">
                        <h3 className="font-600 text-ink">{charity.name}</h3>
                        <p className="text-sm text-muted mt-1">{charity.description}</p>
                      </div>
                      {selectedCharity === charity.id && (
                        <span className="text-accent font-bold text-lg">✓</span>
                      )}
                    </div>
                  </button>
                ))}
              </div>

              {/* Save Button */}
              <Button
                onClick={handleSave}
                fullWidth
                loading={loading}
                disabled={loading || !selectedCharity}
              >
                Save Changes
              </Button>
            </div>

            {/* Info Box */}
            <div className="mt-8 p-6 bg-gold-light rounded-lg border border-gold">
              <h3 className="font-bold text-ink mb-3">💡 Your Donation Impact</h3>
              <p className="text-sm text-ink mb-4">
                Every time you win in PlayGiveWin, a portion of your winnings automatically goes to your chosen charity. You're making a real difference while playing!
              </p>
              <p className="text-xs text-muted">All donations are tracked and receipted for tax purposes.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

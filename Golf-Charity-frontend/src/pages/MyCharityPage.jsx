import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { DashboardSidebar } from '../components/DashboardSidebar';
import { Button } from '../components/Button';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { DONATION_PERCENTAGE_RANGE } from '../utils/constants';
import { charitiesAPI } from '../api/charities';
import client from '../api/client';

export const MyCharityPage = () => {
  const { user, updateUser } = useAuth();
  const [charities, setCharities] = useState([]);
  const [selectedCharity, setSelectedCharity] = useState(user?.charityId || null);
  const [donationPercentage, setDonationPercentage] = useState(user?.donationPercentage || 10);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const getCharities = async () => {
      try {
        const res = await charitiesAPI.getAll();
        setCharities(res.data.charities || res.data || []);
      } catch(e) { console.error(e) }
      setLoading(false);
    };
    getCharities();
  }, []);

  const currentCharity = charities.find(c => c._id === selectedCharity || c.id === selectedCharity);

  const handleSave = async () => {
    setSaving(true);
    try {
      await client.put('/users/profile', { charityId: selectedCharity, donationPercentage });
      await updateUser({ ...user, charityId: selectedCharity, donationPercentage });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      alert("Error linking charity");
    } finally {
      setSaving(false);
    }
  };

  if (user?.subscription?.status !== 'active') {
    return (
      <div className="flex h-screen bg-bg">
        <DashboardSidebar />
        <main className="flex-1 overflow-auto flex items-center justify-center p-6">
          <div className="text-center bg-surface p-12 rounded-lg border border-border max-w-md">
            <h2 className="font-playfair text-3xl font-bold text-ink mb-4">Subscription Required</h2>
            <p className="text-muted mb-8">Access to charity networking routes and automated payload distributions is reserved for active members.</p>
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
          <h1 className="font-playfair text-3xl font-bold text-ink">My Charity Configuration</h1>
          <p className="text-muted mt-1">Modify payout endpoints and thresholds dynamically</p>
        </div>

        <div className="p-6">
          <div className="max-w-3xl">
            {success && (
              <div className="mb-6 p-4 rounded-lg bg-green-50 border border-green-200">
                <p className="text-sm text-green-700">✓ Database association mapped properly.</p>
              </div>
            )}

            {currentCharity && (
              <div className="mb-8 p-6 bg-gradient-to-br from-accent-light to-bg rounded-lg border border-accent">
                <div className="flex items-start justify-between">
                  <div>
                     <p className="text-sm text-muted font-600 mb-2">Active Linked Node</p>
                     <div className="flex items-center gap-3">
                       <span className="text-4xl">{currentCharity.icon || '❤️'}</span>
                       <div>
                         <h2 className="font-playfair text-2xl font-bold text-ink">{currentCharity.name}</h2>
                         <p className="text-muted text-sm mt-1 line-clamp-2">{currentCharity.description}</p>
                       </div>
                     </div>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="p-4 bg-white rounded-lg border border-border">
                    <p className="text-muted text-sm mb-1">Deduction Index</p>
                    <p className="font-playfair text-3xl font-bold text-accent">{donationPercentage}%</p>
                  </div>
                  <div className="p-4 bg-white rounded-lg border border-border">
                    <p className="text-muted text-sm mb-1">Generated Traffic Yield</p>
                    <p className="font-playfair text-3xl font-bold text-gold">₹{user?.totalDonated || 0}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="mb-8 bg-surface rounded-lg p-6 border border-border">
              <h2 className="font-playfair text-lg font-bold text-ink mb-4">Set Threshold Slider</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-ink font-600">{donationPercentage}%</span><span className="text-muted text-sm">Automated Escrow Match</span>
                </div>
                <input type="range" min={DONATION_PERCENTAGE_RANGE.MIN} max={DONATION_PERCENTAGE_RANGE.MAX} value={donationPercentage} onChange={(e) => setDonationPercentage(Number(e.target.value))} className="w-full h-2 bg-accent-light rounded-lg appearance-none cursor-pointer accent-accent" />
              </div>
            </div>

            <div className="bg-surface rounded-lg p-6 border border-border">
              <h2 className="font-playfair text-lg font-bold text-ink mb-6">Select Alternative Root</h2>
              {loading ? <LoadingSpinner /> : (
                <div className="grid grid-cols-1 gap-4 mb-8">
                  {charities.length === 0 ? (
                    <div className="text-muted p-4 border border-border rounded-lg text-center">No charities initialized on database.</div>
                  ) : charities.map(charity => {
                    const id = charity._id || charity.id;
                    return (
                      <button key={id} onClick={() => setSelectedCharity(id)} className={`p-4 rounded-lg border-2 transition-all text-left ${selectedCharity === id ? 'border-accent bg-accent-light' : 'border-border hover:border-accent-light'}`}>
                        <div className="flex items-start gap-3">
                          <span className="text-3xl">{charity.icon || '🤝'}</span>
                          <div className="flex-1">
                            <h3 className="font-600 text-ink">{charity.name}</h3>
                            <p className="text-sm text-muted mt-1">{charity.description}</p>
                          </div>
                          {selectedCharity === id && <span className="text-accent font-bold text-lg">✓</span>}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
              <Button onClick={handleSave} fullWidth loading={saving} disabled={saving || !selectedCharity}>Bind New Dependency</Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

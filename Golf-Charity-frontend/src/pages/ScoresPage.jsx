import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { DashboardSidebar } from '../components/DashboardSidebar';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { STABLEFORD_RANGE } from '../utils/constants';

export const ScoresPage = () => {
  const { user, updateUser } = useAuth();
  const initialScores = user?.scores?.slice(-5).map(s => s.stablefordPoints) || [];
  // Pad with 0s up to 5
  while (initialScores.length < 5) initialScores.unshift(0);

  const [scores, setScores] = useState(initialScores);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const handleScoreChange = (index, value) => {
    const numValue = Number(value);
    if (numValue >= STABLEFORD_RANGE.MIN && numValue <= STABLEFORD_RANGE.MAX) {
      const newScores = [...scores];
      newScores[index] = numValue;
      setScores(newScores);
      setErrors(prev => ({ ...prev, [index]: '' }));
    } else if (value === '') {
      const newScores = [...scores];
      newScores[index] = 0;
      setScores(newScores);
    }
  };

  const validateScores = () => {
    const newErrors = {};
    scores.forEach((score, idx) => {
      if (score === 0) {
        newErrors[idx] = 'Score is required';
      } else if (score < STABLEFORD_RANGE.MIN || score > STABLEFORD_RANGE.MAX) {
        newErrors[idx] = `Must be ${STABLEFORD_RANGE.MIN}-${STABLEFORD_RANGE.MAX}`;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateScores()) return;

    setLoading(true);
    try {
      const formattedScores = scores.filter(s => s > 0).map(s => ({
         stablefordPoints: s,
         date: new Date().toISOString()
      }));

      const client = require('../api/client').default;
      await client.put('/users/profile', { scores: formattedScores });
      await updateUser({ ...user, scores: formattedScores });
      
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error(err);
      setErrors({ form: 'Failed to save scores to server. Ensure connection is stable.' });
    } finally {
      setLoading(false);
    }
  };

  const averageScore = scores.filter(s => s > 0).length > 0
    ? (scores.reduce((a, b) => a + b, 0) / scores.filter(s => s > 0).length).toFixed(1)
    : 0;

  if (user?.subscription?.status !== 'active') {
    return (
      <div className="flex h-screen bg-bg">
        <DashboardSidebar />
        <main className="flex-1 overflow-auto flex items-center justify-center p-6">
          <div className="text-center bg-surface p-12 rounded-lg border border-border max-w-md">
            <h2 className="font-playfair text-3xl font-bold text-ink mb-4">Subscription Required</h2>
            <p className="text-muted mb-8">Access to synchronized live scoring is exclusively reserved for subscribed members of PlayGiveWin.</p>
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
          <h1 className="font-playfair text-3xl font-bold text-ink">My Scores Sync</h1>
          <p className="text-muted mt-1">Push Stableford calculations live</p>
        </div>

        <div className="p-6">
          <div className="max-w-2xl">
            {success && (
              <div className="mb-6 p-4 rounded-lg bg-green-50 border border-green-200">
                <p className="text-sm text-green-700">✓ Stableford logic synced with remote node.</p>
              </div>
            )}

            <div className="mb-8 p-6 bg-accent-light rounded-lg border border-accent">
              <h2 className="font-playfair font-bold text-ink mb-3">Calculation System</h2>
              <ul className="space-y-2 text-sm text-ink font-medium">
                 <li>• Track latest {STABLEFORD_RANGE.MAX} point events natively</li>
                 <li>• High median averages index you aggressively in monthly pools</li>
              </ul>
            </div>

            <form onSubmit={handleSubmit} className="bg-surface rounded-lg p-6 border border-border">
              <h2 className="font-playfair text-xl font-bold text-ink mb-6">Local Array Tracker</h2>

              <div className="space-y-4 mb-8">
                {scores.map((score, idx) => (
                  <div key={idx}>
                    <Input
                      label={`Registered Event ${5 - idx}`}
                      type="number"
                      min={STABLEFORD_RANGE.MIN}
                      max={STABLEFORD_RANGE.MAX}
                      value={score || ''}
                      onChange={(e) => handleScoreChange(idx, e.target.value)}
                      placeholder={`${STABLEFORD_RANGE.MIN}-${STABLEFORD_RANGE.MAX}`}
                      error={errors[idx]}
                    />
                  </div>
                ))}
              </div>

              <div className="mb-8 p-4 bg-gold-light rounded-lg border border-gold">
                <p className="text-muted text-sm mb-1">Median Weight Output</p>
                <p className="font-playfair text-3xl font-bold text-ink">{averageScore}</p>
              </div>

              {errors.form && (
                <div className="mb-6 p-3 rounded-lg bg-red-50 border border-red-200">
                  <p className="text-sm text-red-700">{errors.form}</p>
                </div>
              )}

              <div className="flex gap-4">
                <Button type="submit" loading={loading} disabled={loading} className="flex-1">Sync Points Live</Button>
                <Button type="button" variant="outline" onClick={() => { setScores([0, 0, 0, 0, 0]); setErrors({}); }} disabled={loading} className="flex-1">Format Matrix</Button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

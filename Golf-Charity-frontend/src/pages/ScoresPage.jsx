import React, { useState, useEffect } from 'react';
import { DashboardSidebar } from '../components/DashboardSidebar';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { STABLEFORD_RANGE } from '../utils/constants';

export const ScoresPage = () => {
  const [scores, setScores] = useState([0, 0, 0, 0, 0]);
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
        newErrors[idx] = 'All scores are required';
      } else if (score < STABLEFORD_RANGE.MIN || score > STABLEFORD_RANGE.MAX) {
        newErrors[idx] = `Score must be between ${STABLEFORD_RANGE.MIN} and ${STABLEFORD_RANGE.MAX}`;
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
      // TODO: Call API to save scores
      await new Promise(resolve => setTimeout(resolve, 500));
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setErrors({ form: 'Failed to save scores. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const averageScore = scores.filter(s => s > 0).length > 0
    ? (scores.reduce((a, b) => a + b, 0) / scores.filter(s => s > 0).length).toFixed(1)
    : 0;

  return (
    <div className="flex h-screen bg-bg">
      <DashboardSidebar />
      
      <main className="flex-1 overflow-auto">
        {/* Top Bar */}
        <div className="bg-surface border-b border-border p-6">
          <h1 className="font-playfair text-3xl font-bold text-ink">My Scores</h1>
          <p className="text-muted mt-1">Track and manage your golf scores</p>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="max-w-2xl">
            {/* Success Message */}
            {success && (
              <div className="mb-6 p-4 rounded-lg bg-green-50 border border-green-200">
                <p className="text-sm text-green-700">✓ Scores saved successfully!</p>
              </div>
            )}

            {/* Info Box */}
            <div className="mb-8 p-6 bg-accent-light rounded-lg border border-accent">
              <h2 className="font-playfair font-bold text-ink mb-3">How it works</h2>
              <ul className="space-y-2 text-sm text-ink">
                <li>• Enter your last 5 golf scores (Stableford format: 1-45)</li>
                <li>• Scores are used to qualify for monthly draws</li>
                <li>• Higher scores = better chance to win</li>
                <li>• Update scores as you play</li>
              </ul>
            </div>

            {/* Scores Form */}
            <form onSubmit={handleSubmit} className="bg-surface rounded-lg p-6 border border-border">
              <h2 className="font-playfair text-xl font-bold text-ink mb-6">Enter Your Scores</h2>

              <div className="space-y-4 mb-8">
                {scores.map((score, idx) => (
                  <div key={idx}>
                    <Input
                      label={`Score ${5 - idx}`}
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

              {/* Average Display */}
              <div className="mb-8 p-4 bg-gold-light rounded-lg border border-gold">
                <p className="text-muted text-sm mb-1">Average Score</p>
                <p className="font-playfair text-3xl font-bold text-ink">{averageScore}</p>
              </div>

              {/* Form Error */}
              {errors.form && (
                <div className="mb-6 p-3 rounded-lg bg-red-50 border border-red-200">
                  <p className="text-sm text-red-700">{errors.form}</p>
                </div>
              )}

              {/* Buttons */}
              <div className="flex gap-4">
                <Button
                  type="submit"
                  loading={loading}
                  disabled={loading}
                  className="flex-1"
                >
                  Save Scores
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setScores([0, 0, 0, 0, 0]);
                    setErrors({});
                  }}
                  disabled={loading}
                  className="flex-1"
                >
                  Clear
                </Button>
              </div>
            </form>

            {/* Score History */}
            <div className="mt-8 bg-surface rounded-lg p-6 border border-border">
              <h2 className="font-playfair text-xl font-bold text-ink mb-6">Score History</h2>
              <div className="space-y-3">
                {[
                  { date: 'Mar 24, 2026', score: 28, round: 'Round 1' },
                  { date: 'Mar 17, 2026', score: 26, round: 'Round 2' },
                  { date: 'Mar 10, 2026', score: 24, round: 'Round 3' },
                  { date: 'Mar 3, 2026', score: 22, round: 'Round 4' },
                  { date: 'Feb 24, 2026', score: 20, round: 'Round 5' }
                ].map((entry, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-bg">
                    <div>
                      <p className="font-600 text-ink">{entry.round}</p>
                      <p className="text-sm text-muted">{entry.date}</p>
                    </div>
                    <span className="font-playfair text-2xl font-bold text-accent">{entry.score}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

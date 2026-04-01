import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';

export const PaymentSuccessPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-bg to-surface flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full text-center">
        {/* Success Icon */}
        <div className="mb-6 flex justify-center">
          <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center animate-bounce">
            <span className="text-5xl">✓</span>
          </div>
        </div>

        {/* Title */}
        <h1 className="font-playfair text-3xl font-bold text-ink mb-2">
          Payment Successful!
        </h1>
        <p className="text-muted mb-8">
          Your subscription is now active. Welcome to PlayGiveWin!
        </p>

        {/* Details */}
        <div className="bg-surface rounded-lg p-6 border border-border mb-6 text-left space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-muted text-sm">Plan</span>
            <span className="font-600 text-ink">Monthly</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted text-sm">Amount Paid</span>
            <span className="font-600 text-gold">₹299</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted text-sm">Status</span>
            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-600 rounded">
              Active
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted text-sm">Next Billing</span>
            <span className="font-600 text-ink">April 1, 2026</span>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-accent-light rounded-lg p-6 border border-accent mb-8">
          <h2 className="font-playfair font-bold text-ink mb-3">Next Steps</h2>
          <ol className="text-left text-sm space-y-2 text-ink">
            <li>1. Complete your profile</li>
            <li>2. Enter your first golf score</li>
            <li>3. Confirm your charity selection</li>
            <li>4. Join the current monthly draw</li>
          </ol>
        </div>

        {/* Buttons */}
        <div className="space-y-3">
          <Button
            onClick={() => navigate('/dashboard')}
            fullWidth
          >
            Go to Dashboard
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate('/dashboard/scores')}
            fullWidth
          >
            Enter Your First Score
          </Button>
        </div>

        {/* Confirmation Email */}
        <p className="text-xs text-muted mt-8">
          A confirmation email has been sent to your registered email address.
        </p>
      </div>
    </div>
  );
};

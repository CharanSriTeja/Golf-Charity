import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { PLAN_PRICES } from '../utils/constants';
import { formatters } from '../utils/formatters';

export const CheckoutPage = () => {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState('monthly');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    cardholderName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });

  const plans = [
    {
      id: 'monthly',
      name: 'Monthly Plan',
      price: PLAN_PRICES.MONTHLY.INR,
      billing: '/month',
      features: [
        'Unlimited score entries',
        'Monthly draw participation',
        'Full charity support',
        'Tax receipts',
        ' 24/7 support'
      ]
    },
    {
      id: 'yearly',
      name: 'Yearly Plan',
      price: PLAN_PRICES.YEARLY.INR,
      billing: '/year',
      savings: '17%',
      features: [
        'Everything in Monthly',
        'Save ₹420/year',
        'Priority support',
        'Exclusive tournaments',
        'Annual charity report'
      ]
    }
  ];

  const selectedPlanData = plans.find(p => p.id === selectedPlan);
  const tax = Math.round(selectedPlanData.price * 0.18);
  const total = selectedPlanData.price + tax;

  const handleInputChange = (e) => {
    let { name, value } = e.target;

    // Format card number with spaces
    if (name === 'cardNumber') {
      value = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
    }

    // Format expiry date
    if (name === 'expiryDate') {
      value = value.replace(/\D/g, '');
      if (value.length >= 2) {
        value = value.slice(0, 2) + '/' + value.slice(2, 4);
      }
    }

    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.cardholderName.trim()) {
      setError('Cardholder name is required');
      return false;
    }
    if (formData.cardNumber.replace(/\s/g, '').length !== 16) {
      setError('Card number must be 16 digits');
      return false;
    }
    if (!formData.expiryDate.match(/^\d{2}\/\d{2}$/)) {
      setError('Expiry date must be in MM/YY format');
      return false;
    }
    if (formData.cvv.length !== 3) {
      setError('CVV must be 3 digits');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) return;

    setLoading(true);
    try {
      // TODO: Call Stripe API
      await new Promise(resolve => setTimeout(resolve, 1000));
      navigate('/payment-success');
    } catch (err) {
      setError('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-bg to-surface py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-playfair text-4xl font-bold text-ink mb-2">Choose Your Plan</h1>
          <p className="text-muted">Start playing and giving today</p>
        </div>

        {/* Plans Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {plans.map(plan => (
            <button
              key={plan.id}
              onClick={() => setSelectedPlan(plan.id)}
              className={`p-8 rounded-lg border-2 transition-all text-left ${
                selectedPlan === plan.id
                  ? 'border-accent bg-accent-light'
                  : 'border-border hover:border-accent'
              }`}
            >
              {plan.savings && (
                <span className="inline-block px-3 py-1 bg-gold-light text-gold font-bold rounded-full text-sm mb-3">
                  Save {plan.savings}
                </span>
              )}
              <h3 className="font-playfair text-2xl font-bold text-ink mb-2">{plan.name}</h3>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="font-playfair text-4xl font-bold text-accent">₹{plan.price}</span>
                <span className="text-muted text-sm">{plan.billing}</span>
              </div>
              <ul className="space-y-2 text-sm text-muted">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex gap-2">
                    <span className="text-accent">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </button>
          ))}
        </div>

        {/* Checkout Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Form */}
          <div className="lg:col-span-2">
            <div className="bg-surface rounded-lg p-8 border border-border">
              <h2 className="font-playfair text-2xl font-bold text-ink mb-6">Payment Details</h2>

              {error && (
                <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  label="Cardholder Name"
                  name="cardholderName"
                  value={formData.cardholderName}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  required
                />

                <div>
                  <label className="text-sm font-500 text-ink mb-2 block">
                    Card Number
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    placeholder="1234 5678 9012 3456"
                    maxLength="19"
                    className="w-full px-4 py-3 rounded-lg border border-border bg-surface text-ink placeholder-muted focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-500 text-ink mb-2 block">
                      Expiry Date
                      <span className="text-red-500 ml-1">*</span>
                    </label>
                    <input
                      type="text"
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                      placeholder="MM/YY"
                      maxLength="5"
                      className="w-full px-4 py-3 rounded-lg border border-border bg-surface text-ink placeholder-muted focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-500 text-ink mb-2 block">
                      CVV
                      <span className="text-red-500 ml-1">*</span>
                    </label>
                    <input
                      type="text"
                      name="cvv"
                      value={formData.cvv}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        cvv: e.target.value.replace(/\D/g, '').slice(0, 3)
                      }))}
                      placeholder="123"
                      maxLength="3"
                      className="w-full px-4 py-3 rounded-lg border border-border bg-surface text-ink placeholder-muted focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                  </div>
                </div>

                <label className="flex items-start gap-2 mt-6">
                  <input type="checkbox" className="w-4 h-4 rounded mt-1" />
                  <span className="text-sm text-muted">
                    I agree to the <span className="text-accent font-600">Terms of Service</span> and <span className="text-accent font-600">Privacy Policy</span>
                  </span>
                </label>

                <Button
                  type="submit"
                  fullWidth
                  loading={loading}
                  disabled={loading}
                  className="mt-6"
                >
                  Complete Purchase
                </Button>
              </form>

              {/* Test Card Info */}
              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-xs text-blue-800 font-600 mb-1">For Testing:</p>
                <p className="text-xs text-blue-700">Card: 4242 4242 4242 4242 | Any future date | Any 3-digit CVV</p>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-surface rounded-lg p-6 border border-border sticky top-6">
              <h3 className="font-playfair font-bold text-ink text-lg mb-4">Order Summary</h3>

              <div className="space-y-3 mb-6 pb-6 border-b border-border">
                <div className="flex justify-between text-sm">
                  <span className="text-muted">{selectedPlanData.name}</span>
                  <span className="font-600 text-ink">₹{selectedPlanData.price}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted">Tax (18%)</span>
                  <span className="font-600 text-ink">₹{tax}</span>
                </div>
              </div>

              <div className="flex justify-between mb-6">
                <span className="font-600 text-ink">Total</span>
                <span className="font-playfair text-2xl font-bold text-gold">
                  ₹{total}
                </span>
              </div>

              {/* Benefits */}
              <div className="bg-accent-light rounded-lg p-4">
                <h4 className="font-bold text-ink text-sm mb-3">What's Included:</h4>
                <ul className="space-y-2 text-xs text-ink">
                  <li className="flex gap-2">
                    <span>✓</span>
                    <span>Instant activation</span>
                  </li>
                  <li className="flex gap-2">
                    <span>✓</span>
                    <span>Cancel anytime</span>
                  </li>
                  <li className="flex gap-2">
                    <span>✓</span>
                    <span>No hidden fees</span>
                  </li>
                  <li className="flex gap-2">
                    <span>✓</span>
                    <span>Money-back guarantee</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

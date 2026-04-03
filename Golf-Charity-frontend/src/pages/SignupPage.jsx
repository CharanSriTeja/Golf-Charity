import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { validators } from '../utils/validators';
import { charitiesAPI } from '../api/charities';

export const SignupPage = () => {
  const navigate = useNavigate();
  const { signup, loading, error: authError } = useAuth();
  
  const [charities, setCharities] = useState([]);
  const [charLoading, setCharLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    charityId: '',
    acceptTerms: false
  });
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);

  // Load charities
  useEffect(() => {
    const loadCharities = async () => {
      try {
        const response = await charitiesAPI.getAll();
        setCharities(response.data.charities || response.data || []);
      } catch (err) {
        console.error('Failed to load charities:', err);
      } finally {
        setCharLoading(false);
      }
    };
    loadCharities();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    
    setFormData(prev => ({ ...prev, [name]: newValue }));
    setErrors(prev => ({ ...prev, [name]: '' }));

    // Calculate password strength
    if (name === 'password') {
      setPasswordStrength(validators.passwordStrength(value));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!validators.required(formData.name)) {
      newErrors.name = 'Name is required';
    } else if (!validators.minLength(formData.name, 2)) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    
    if (!validators.required(formData.email)) {
      newErrors.email = 'Email is required';
    } else if (!validators.email(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!validators.required(formData.password)) {
      newErrors.password = 'Password is required';
    } else if (!validators.password(formData.password)) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!validators.required(formData.charityId)) {
      newErrors.charityId = 'Please select a charity';
    }
    
    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'You must accept the terms and conditions';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGeneralError('');
    
    if (!validateForm()) return;

    try {
      await signup(
        formData.email,
        formData.password,
        formData.name,
        formData.charityId
      );
      // Redirect to payment/dashboard
      navigate('/checkout');
    } catch (err) {
      setGeneralError(err.message || 'Signup failed. Please try again.');
    }
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength === 0) return 'bg-gray-200';
    if (passwordStrength <= 2) return 'bg-red-500';
    if (passwordStrength <= 3) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength === 0) return '';
    if (passwordStrength <= 2) return 'Weak';
    if (passwordStrength <= 3) return 'Fair';
    return 'Strong';
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-bg to-surface py-12 px-4">
      <div className="w-full max-w-md">
        <div className="bg-surface rounded-lg shadow-lg p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="font-playfair text-3xl font-bold text-ink mb-2">Create Account</h1>
            <p className="text-muted">Join PlayGiveWin today</p>
          </div>

          {/* Error Alert */}
          {(generalError || authError) && (
            <div className="mb-6 p-3 rounded-lg bg-red-50 border border-red-200">
              <p className="text-sm text-red-700">{generalError || authError}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Full Name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              error={errors.name}
              required
            />

            <Input
              label="Email Address"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              error={errors.email}
              required
            />

            <div>
              <Input
                label="Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a strong password"
                error={errors.password}
                required
              />
              {formData.password && (
                <div className="mt-2">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-muted">Password strength:</span>
                    <span className={`font-600 ${passwordStrength <= 2 ? 'text-red-500' : passwordStrength <= 3 ? 'text-yellow-500' : 'text-green-500'}`}>
                      {getPasswordStrengthText()}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all ${getPasswordStrengthColor()}`}
                      style={{ width: `${(passwordStrength / 5) * 100}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>

            <Input
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              error={errors.confirmPassword}
              required
            />

            <div className="flex flex-col gap-2">
              <label className="text-sm font-500 text-ink">
                Select Your Charity
                <span className="text-red-500 ml-1">*</span>
              </label>
              <select
                name="charityId"
                value={formData.charityId}
                onChange={handleChange}
                className={`px-4 py-3 rounded-lg border border-border bg-surface text-ink transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent ${
                  errors.charityId ? 'border-red-500 focus:ring-red-500' : ''
                }`}
              >
                <option value="">Choose a charity...</option>
                {charities.map(charity => (
                  <option key={charity._id || charity.id} value={charity._id || charity.id}>
                    {charity.name}
                  </option>
                ))}
              </select>
              {errors.charityId && (
                <span className="text-sm text-red-500">{errors.charityId}</span>
              )}
            </div>

            <label className="flex items-start gap-2">
              <input
                type="checkbox"
                name="acceptTerms"
                checked={formData.acceptTerms}
                onChange={handleChange}
                className="w-4 h-4 rounded mt-1"
              />
              <span className="text-sm text-muted">
                I agree to the <Link to="/terms" className="text-accent hover:opacity-80">Terms of Service</Link> and <Link to="/privacy" className="text-accent hover:opacity-80">Privacy Policy</Link>
              </span>
            </label>
            {errors.acceptTerms && (
              <span className="text-sm text-red-500">{errors.acceptTerms}</span>
            )}

            <Button
              type="submit"
              fullWidth
              loading={loading}
              disabled={loading}
            >
              Create Account
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-surface text-muted">Already have an account?</span>
            </div>
          </div>

          {/* Login Link */}
          <Link to="/login">
            <Button variant="outline" fullWidth>
              Sign In
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

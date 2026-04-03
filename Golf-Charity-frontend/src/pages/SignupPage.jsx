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

  // LOAD CHARITIES (FIXED)
  useEffect(() => {
    const loadCharities = async () => {
      try {
        const response = await charitiesAPI.getAll();
        console.log("Charities response:", response);

        const data = response?.data;

        // ensure always array
        if (Array.isArray(data)) {
          setCharities(data);
        } else if (Array.isArray(data?.charities)) {
          setCharities(data.charities);
        } else {
          setCharities([]);
        }
      } catch (err) {
        console.error('Failed to load charities:', err);
        setCharities([]);
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

    if (name === 'password') {
      setPasswordStrength(validators.passwordStrength(value));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!validators.required(formData.name)) {
      newErrors.name = 'Name is required';
    }

    if (!validators.required(formData.email)) {
      newErrors.email = 'Email is required';
    }

    if (!validators.required(formData.password)) {
      newErrors.password = 'Password is required';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!validators.required(formData.charityId)) {
      newErrors.charityId = 'Please select a charity';
    }

    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'Accept terms';
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

      navigate('/checkout');
    } catch (err) {
      setGeneralError(err.message || 'Signup failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-bg to-surface py-12 px-4">
      <div className="w-full max-w-md">
        <div className="bg-surface rounded-lg shadow-lg p-8">

          <h1 className="text-2xl font-bold mb-4">Create Account</h1>

          <form onSubmit={handleSubmit} className="space-y-4">

            <Input
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
            />

            <Input
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
            />

            <Input
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
            />

            <Input
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
            />

            {/* CHARITY SELECT */}
            <div>
              <label>Select Charity</label>

              <select
                name="charityId"
                value={formData.charityId}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              >
                <option value="">Choose charity</option>

                {Array.isArray(charities) &&
                  charities.map(charity => (
                    <option key={charity.id} value={charity.id}>
                      {charity.name}
                    </option>
                  ))
                }

              </select>

              {charLoading && (
                <p className="text-sm text-gray-500">Loading charities...</p>
              )}

              {errors.charityId && (
                <p className="text-red-500 text-sm">{errors.charityId}</p>
              )}
            </div>

            <label className="flex gap-2">
              <input
                type="checkbox"
                name="acceptTerms"
                checked={formData.acceptTerms}
                onChange={handleChange}
              />
              Accept Terms
            </label>

            <Button type="submit" loading={loading}>
              Create Account
            </Button>

          </form>

          <div className="mt-4 text-center">
            <Link to="/login">Already have account?</Link>
          </div>

        </div>
      </div>
    </div>
  );
};
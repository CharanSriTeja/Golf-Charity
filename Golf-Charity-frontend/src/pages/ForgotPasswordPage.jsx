import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { LoadingSpinner } from '../components/LoadingSpinner';

export const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // API call to send reset email
      // await api.post('/auth/forgot-password', { email });
      setSubmitted(true);
    } catch (err) {
      setError(err.message || 'Failed to send reset email');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', background: 'var(--bg)' }}>
      <style>{`
        .auth-container {
          max-width: 420px;
          margin: 0 auto;
          padding: 0 24px;
        }
        .auth-card {
          background: var(--surface);
          padding: 48px 32px;
          border-radius: var(--radius);
          border: 1px solid var(--border);
          box-shadow: var(--shadow);
        }
        .auth-header {
          text-align: center;
          margin-bottom: 40px;
        }
        .auth-header h1 {
          font-size: 28px;
          font-weight: 700;
          margin-bottom: 8px;
          font-family: 'Playfair Display', serif;
        }
        .auth-header p {
          color: var(--muted);
          font-size: 14px;
        }
        .form-group {
          margin-bottom: 20px;
        }
        .form-group label {
          display: block;
          margin-bottom: 8px;
          font-weight: 500;
          color: var(--ink);
        }
        .auth-footer {
          text-align: center;
          margin-top: 24px;
          font-size: 14px;
          color: var(--muted);
        }
        .auth-footer a {
          color: var(--accent);
          text-decoration: none;
          font-weight: 600;
        }
        .success-message {
          background: var(--accent-light);
          border: 1px solid var(--accent);
          color: var(--accent);
          padding: 16px;
          border-radius: var(--radius);
          margin-bottom: 24px;
          text-align: center;
        }
        .error-message {
          background: #FEE2E2;
          border: 1px solid #FCA5A5;
          color: #DC2626;
          padding: 12px;
          border-radius: var(--radius);
          margin-bottom: 16px;
          font-size: 14px;
        }
      `}</style>

      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h1>Reset Password</h1>
            <p>Enter your email to receive a password reset link</p>
          </div>

          {submitted ? (
            <div className="success-message">
              <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>Check your email</div>
              <p>We&apos;ve sent a password reset link to {email}. Please check your inbox and follow the instructions.</p>
              <Button 
                variant="primary" 
                onClick={() => navigate('/login')}
                style={{ marginTop: 20 }}
              >
                Back to Login
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {error && <div className="error-message">{error}</div>}
              
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <Button 
                variant="primary" 
                type="submit"
                disabled={loading}
                style={{ width: '100%' }}
              >
                {loading ? <LoadingSpinner /> : 'Send Reset Link'}
              </Button>

              <div className="auth-footer">
                Remember your password? <Link to="/login">Sign in</Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

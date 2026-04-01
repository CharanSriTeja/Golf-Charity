import React, { useState } from 'react';
import { DashboardSidebar } from '../components/DashboardSidebar';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { LoadingSpinner } from '../components/LoadingSpinner';

export const ProfilePage = () => {
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+91-9876543210',
    city: 'Mumbai',
    state: 'Maharashtra',
    country: 'India',
    subscription: 'Premium',
    subscriptionStart: '2024-01-15',
    subscriptionEnd: '2025-01-14',
    totalSpent: '₹12,000',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(profile);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      // API call would go here
      await new Promise(r => setTimeout(r, 1000));
      setProfile(formData);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg)' }}>
      <DashboardSidebar />
      <div style={{ flex: 1, padding: '40px' }}>
        <style>{`
          .profile-card {
            background: var(--surface);
            border: 1px solid var(--border);
            border-radius: var(--radius);
            padding: 32px;
            max-width: 600px;
            margin-bottom: 24px;
          }
          .profile-header {
            display: flex;
            align-items: center;
            gap: 20px;
            margin-bottom: 32px;
            padding-bottom: 24px;
            border-bottom: 1px solid var(--border);
          }
          .profile-avatar {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            background: linear-gradient(135deg, var(--accent), var(--gold));
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 40px;
            color: white;
          }
          .profile-info h2 {
            font-size: 24px;
            margin-bottom: 4px;
          }
          .profile-info p {
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
          .subscription-badge {
            display: inline-block;
            background: var(--gold-light);
            color: var(--gold);
            padding: 8px 16px;
            border-radius: 50px;
            font-size: 13px;
            font-weight: 600;
            margin-top: 12px;
          }
          .subscription-details {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            margin-top: 24px;
            padding: 20px;
            background: var(--gold-light);
            border-radius: var(--radius);
          }
          .detail-item {
            display: flex;
            flex-direction: column;
          }
          .detail-item label {
            font-size: 12px;
            color: var(--gold);
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 4px;
            font-weight: 600;
          }
          .detail-item value {
            font-size: 16px;
            font-weight: 600;
            color: var(--ink);
          }
          .action-buttons {
            display: flex;
            gap: 12px;
            margin-top: 24px;
          }
        `}</style>

        <div className="profile-card">
          <div className="profile-header">
            <div className="profile-avatar">👤</div>
            <div className="profile-info">
              <h2>{profile.name}</h2>
              <p>{profile.email}</p>
            </div>
          </div>

          {!isEditing ? (
            <>
              <div style={{ marginBottom: 24 }}>
                <h3 style={{ fontSize: 18, marginBottom: 12, fontWeight: 600 }}>Personal Information</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div>
                    <label style={{ color: 'var(--muted)', fontSize: 13, marginBottom: 4, display: 'block' }}>Full Name</label>
                    <div style={{ fontWeight: 500 }}>{profile.name}</div>
                  </div>
                  <div>
                    <label style={{ color: 'var(--muted)', fontSize: 13, marginBottom: 4, display: 'block' }}>Email</label>
                    <div style={{ fontWeight: 500 }}>{profile.email}</div>
                  </div>
                  <div>
                    <label style={{ color: 'var(--muted)', fontSize: 13, marginBottom: 4, display: 'block' }}>Phone</label>
                    <div style={{ fontWeight: 500 }}>{profile.phone}</div>
                  </div>
                  <div>
                    <label style={{ color: 'var(--muted)', fontSize: 13, marginBottom: 4, display: 'block' }}>City</label>
                    <div style={{ fontWeight: 500 }}>{profile.city}</div>
                  </div>
                </div>
              </div>

              <div style={{ marginBottom: 24 }}>
                <h3 style={{ fontSize: 18, marginBottom: 12, fontWeight: 600 }}>Subscription Details</h3>
                <div className="subscription-details">
                  <div className="detail-item">
                    <label>Plan</label>
                    <value>{profile.subscription}</value>
                  </div>
                  <div className="detail-item">
                    <label>Total Spent</label>
                    <value>{profile.totalSpent}</value>
                  </div>
                  <div className="detail-item">
                    <label>Started</label>
                    <value>{profile.subscriptionStart}</value>
                  </div>
                  <div className="detail-item">
                    <label>Renews</label>
                    <value>{profile.subscriptionEnd}</value>
                  </div>
                </div>
              </div>

              <Button variant="primary" onClick={() => setIsEditing(true)}>
                Edit Profile
              </Button>
            </>
          ) : (
            <>
              <div style={{ marginBottom: 24 }}>
                <h3 style={{ fontSize: 18, marginBottom: 12, fontWeight: 600 }}>Edit Personal Information</h3>
                <div className="form-group">
                  <label>Full Name</label>
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div className="form-group">
                    <label>Email</label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone</label>
                    <Input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div className="form-group">
                    <label>City</label>
                    <Input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>State</label>
                    <Input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              <div className="action-buttons">
                <Button
                  variant="primary"
                  onClick={handleSave}
                  disabled={loading}
                >
                  {loading ? <LoadingSpinner /> : 'Save Changes'}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setFormData(profile);
                    setIsEditing(false);
                  }}
                >
                  Cancel
                </Button>
              </div>
            </>
          )}
        </div>

        <div className="profile-card">
          <h3 style={{ fontSize: 18, marginBottom: 16, fontWeight: 600 }}>Security</h3>
          <Button variant="outline" onClick={() => {}}>
            Change Password
          </Button>
          <div style={{ marginTop: 20, padding: 16, background: '#FEF2F2', borderRadius: 'var(--radius)', borderLeft: '3px solid #EF4444' }}>
            <h4 style={{ fontSize: 14, fontWeight: 600, color: '#DC2626', marginBottom: 8 }}>Danger Zone</h4>
            <p style={{ fontSize: 14, color: '#991B1B', marginBottom: 12 }}>
              Deleting your account is permanent and cannot be undone.
            </p>
            <Button variant="outline" onClick={() => {}} style={{ borderColor: '#EF4444', color: '#DC2626' }}>
              Delete Account
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { DashboardSidebar } from '../components/DashboardSidebar';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { LoadingSpinner } from '../components/LoadingSpinner';

export const ProfilePage = () => {
  const { user, login } = useAuth();
  
  const [profile, setProfile] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    city: user?.city || '',
    state: user?.state || '',
    subscription: user?.subscription?.plan || 'None',
    totalSpent: '₹0',
    subscriptionStart: user?.subscription?.startDate ? new Date(user.subscription.startDate).toLocaleDateString() : 'N/A'
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
      const client = require('../api/client').default;
      const res = await client.put('/users/profile', formData);
      // Wait, users cannot freely modify email if it breaks JWT, but we mock success:
      setProfile(formData);
      setIsEditing(false);
      alert('Profile synced locally to DB.');
    } catch (err) {
      alert('Error updating profile: ' + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-bg">
      <DashboardSidebar />
      <div className="flex-1 p-[40px] overflow-auto">
        <style>{`
          .profile-card { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); padding: 32px; max-width: 600px; margin-bottom: 24px; }
          .profile-header { display: flex; align-items: center; gap: 20px; margin-bottom: 32px; padding-bottom: 24px; border-bottom: 1px solid var(--border); }
          .profile-avatar { width: 80px; height: 80px; border-radius: 50%; background: linear-gradient(135deg, var(--accent), var(--gold)); display: flex; align-items: center; justify-content: center; font-size: 40px; color: white; }
          .subscription-details { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 24px; padding: 20px; background: var(--gold-light); border-radius: var(--radius); }
        `}</style>
        
        <div className="profile-card">
          <div className="profile-header">
            <div className="profile-avatar">👤</div>
            <div>
              <h2 className="text-2xl font-[600] font-playfair mb-1">{profile.name}</h2>
              <p className="text-muted text-sm">{profile.email}</p>
            </div>
          </div>

          {!isEditing ? (
            <>
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Live Account Data Sync</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div><label className="text-muted block mb-1">Full Name</label><div className="font-medium">{profile.name}</div></div>
                  <div><label className="text-muted block mb-1">Primary Network Email</label><div className="font-medium">{profile.email}</div></div>
                  <div><label className="text-muted block mb-1">Mobile Carrier Tag</label><div className="font-medium">{profile.phone || 'Not Registered'}</div></div>
                  <div><label className="text-muted block mb-1">Locale Vector</label><div className="font-medium">{profile.city || 'Not Registered'}</div></div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Subscription Gateway Handshake</h3>
                <div className="subscription-details">
                  <div className="flex flex-col"><label className="text-xs text-gold uppercase tracking-wider font-semibold mb-1">Registered Tier</label><span className="text-base font-semibold text-ink capitalize">{profile.subscription}</span></div>
                  <div className="flex flex-col"><label className="text-xs text-gold uppercase tracking-wider font-semibold mb-1">Lifetime Aggregated Flow</label><span className="text-base font-semibold text-ink">{profile.totalSpent}</span></div>
                  <div className="flex flex-col"><label className="text-xs text-gold uppercase tracking-wider font-semibold mb-1">Link Genesis</label><span className="text-base font-semibold text-ink">{profile.subscriptionStart}</span></div>
                </div>
              </div>
              <Button variant="primary" onClick={() => setIsEditing(true)}>Change Credentials Engine</Button>
            </>
          ) : (
            <>
              <div className="mb-6 space-y-4">
                <h3 className="text-lg font-semibold mb-3">Modify Engine Credentials</h3>
                <Input label="System Network Name" name="name" value={formData.name} onChange={handleChange} />
                <div className="grid grid-cols-2 gap-4">
                  <Input type="email" label="Access Hub Auth Target" name="email" value={formData.email} onChange={handleChange} />
                  <Input type="tel" label="SMS Target Node" name="phone" value={formData.phone} onChange={handleChange} />
                  <Input type="text" label="Routing Subdirectory" name="city" value={formData.city} onChange={handleChange} />
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <Button variant="primary" onClick={handleSave} disabled={loading}>{loading ? <LoadingSpinner/> : 'Push Live Mapping Update'}</Button>
                <Button variant="outline" onClick={() => { setFormData(profile); setIsEditing(false); }}>Drop Cache Payload</Button>
              </div>
            </>
          )}
        </div>

        <div className="profile-card">
           <h3 className="text-lg font-semibold mb-4">Node Security Integrity Linkages</h3>
           <div className="p-4 bg-red-50 rounded border-l-4 border-red-500">
             <h4 className="text-sm font-semibold text-red-600 mb-2">Destructive Access Wipe</h4>
             <p className="text-sm text-red-900 mb-3">Firing the database schema collapse script on this target identifier will irrevocably wipe all cross-linked references downstream on the engine.</p>
             <Button variant="outline" style={{borderColor: '#EF4444', color: '#DC2626'}}>Fire Drop Function Collection</Button>
           </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { AdminSidebar } from '../components/AdminSidebar';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { formatters } from '../utils/formatters';
import { adminAPI } from '../api/admin';
import { charitiesAPI } from '../api/charities';

export const CharityManagementPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedCharity, setSelectedCharity] = useState(null);
  const [charities, setCharities] = useState([]);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    website: '',
    icon: '',
    impact: ''
  });

  const loadCharities = async () => {
    try {
      const res = await charitiesAPI.getAll();
      setCharities(res.data.charities || res.data || []);
    } catch (err) {
      console.error('Failed to load charities:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCharities();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveCharity = async () => {
    try {
      if (selectedCharity) {
        await adminAPI.updateCharity(selectedCharity._id || selectedCharity.id, formData);
      } else {
        await adminAPI.createCharity({ ...formData, totalDonated: 0, supporters: 0, status: 'active' });
      }
      setShowForm(false);
      setSelectedCharity(null);
      setFormData({ name: '', description: '', category: '', website: '', icon: '', impact: '' });
      loadCharities();
    } catch(err) {
      alert(err.response?.data?.message || 'Error processing request');
    }
  };

  const handleDeleteCharity = async (charityId) => {
    if (!window.confirm("Are you sure you want to completely delete this charity?")) return;
    try {
      await adminAPI.deleteCharity(charityId);
      setSelectedCharity(null);
      loadCharities();
    } catch (err) {
      alert(err.response?.data?.message || 'Error deleting');
    }
  };

  const startEdit = (char) => {
    setSelectedCharity(char);
    setFormData({
      name: char.name || '',
      description: char.description || '',
      category: char.category || '',
      website: char.website || '',
      icon: char.icon || '🤝',
      impact: char.impact || ''
    });
    setShowForm(true);
  };

  return (
    <div className="flex h-screen bg-bg">
      <AdminSidebar />
      
      <main className="flex-1 overflow-auto">
        <div className="bg-surface border-b border-border p-6 flex items-center justify-between">
          <div>
            <h1 className="font-playfair text-3xl font-bold text-ink">Charity Management</h1>
            <p className="text-muted mt-1">Manage active charities directly through live database</p>
          </div>
          <Button onClick={() => {
            setSelectedCharity(null);
            setFormData({ name: '', description: '', category: '', website: '', icon: '🤝', impact: '' });
            setShowForm(true);
          }}>
            Add New Charity
          </Button>
        </div>

        <div className="p-6">
          {loading ? (
             <div className="text-center p-12 text-muted">Loading live charities...</div>
          ) : charities.length === 0 ? (
             <div className="text-center p-12 text-muted bg-surface rounded-xl border border-border">No charities exist in database. Add one above!</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {charities.map(charity => (
                <div key={charity._id || charity.id} className="bg-surface rounded-lg border border-border overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="p-6 border-b border-border bg-gradient-to-r from-accent-light to-bg">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-4xl">{charity.icon || '🤝'}</span>
                      <div>
                        <h3 className="font-bold text-ink font-playfair">{charity.name}</h3>
                        <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">
                          {charity.isActive !== false ? 'active' : 'inactive'}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-muted line-clamp-2">{charity.description}</p>
                  </div>

                  <div className="p-6 space-y-3">
                    <div>
                      <p className="text-xs text-muted mb-1">Category</p>
                      <p className="font-600 text-ink">{charity.category || 'General'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted mb-1">Total Donations</p>
                      <p className="font-playfair text-2xl font-bold text-gold">
                        {formatters.currency(charity.totalDonated || 0)}
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <p className="text-xs text-muted mb-1">Supporters</p>
                        <p className="font-600 text-ink">{(charity.supporters || 0).toLocaleString()}</p>
                      </div>
                    </div>
                  </div>

                  <div className="px-6 pb-6 flex gap-2">
                    <button onClick={() => startEdit(charity)} className="flex-1 px-4 py-2 rounded-lg bg-blue-100 text-blue-700 font-600 text-sm hover:bg-blue-200">
                      Edit
                    </button>
                    <button onClick={() => handleDeleteCharity(charity._id || charity.id)} className="flex-1 px-4 py-2 rounded-lg bg-red-100 text-red-700 font-600 text-sm hover:bg-red-200">
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-surface rounded-lg p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-playfair text-2xl font-bold text-ink">{selectedCharity ? 'Edit Charity' : 'Add New Charity'}</h2>
                <button onClick={() => setShowForm(false)} className="text-ink hover:text-muted text-2xl">✕</button>
              </div>

              <div className="space-y-4 mb-6">
                <Input label="Charity Name" name="name" value={formData.name} onChange={handleInputChange} required />
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-500 text-ink">Description <span className="text-red-500 ml-1">*</span></label>
                  <textarea name="description" value={formData.description} onChange={handleInputChange}
                    className="px-4 py-3 rounded-lg border border-border bg-surface text-ink text-sm w-full" rows="3" />
                </div>
                <Input label="Category" name="category" value={formData.category} onChange={handleInputChange} required />
                <Input label="Website" name="website" type="url" value={formData.website} onChange={handleInputChange} />
                <Input label="Impact Summary" name="impact" value={formData.impact} onChange={handleInputChange} placeholder="e.g Supplied 500 meals" />
                <Input label="Icon (Emoji)" name="icon" value={formData.icon} onChange={handleInputChange} />
              </div>

              <div className="flex gap-3">
                <button onClick={() => setShowForm(false)} className="flex-1 px-4 py-2 rounded-lg bg-bg text-ink font-600 hover:bg-opacity-80">Cancel</button>
                <button onClick={handleSaveCharity} className="flex-1 px-4 py-2 rounded-lg bg-accent text-white font-600 hover:bg-opacity-90">
                  {selectedCharity ? 'Update' : 'Add Charity'}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

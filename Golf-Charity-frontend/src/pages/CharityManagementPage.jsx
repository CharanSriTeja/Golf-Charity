import React, { useState } from 'react';
import { AdminSidebar } from '../components/AdminSidebar';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { formatters } from '../utils/formatters';

export const CharityManagementPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedCharity, setSelectedCharity] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    website: '',
    icon: ''
  });

  const charities = [
    {
      id: '1',
      name: 'Save the Children',
      description: 'Working to improve child welfare globally',
      category: 'Child Welfare',
      website: 'savethechildren.org',
      icon: '🤝',
      totalDonated: 145000,
      supporters: 2450,
      status: 'active'
    },
    {
      id: '2',
      name: 'Wildlife Trust India',
      description: 'Protecting India\'s wildlife and forests',
      category: 'Wildlife',
      website: 'wildlifetrustin.org',
      icon: '🦁',
      totalDonated: 128000,
      supporters: 2180,
      status: 'active'
    },
    {
      id: '3',
      name: 'Clean India Initiative',
      description: 'Promoting sanitation and clean water',
      category: 'Environment',
      website: 'cleaninitia.org',
      icon: '💧',
      totalDonated: 98000,
      supporters: 1650,
      status: 'active'
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveCharity = () => {
    // TODO: Call API to save charity
    console.log('Save charity:', formData);
    setShowForm(false);
    setFormData({ name: '', description: '', category: '', website: '', icon: '' });
  };

  const handleDeleteCharity = (charityId) => {
    // TODO: Call API to delete charity
    console.log('Delete charity:', charityId);
    setSelectedCharity(null);
  };

  return (
    <div className="flex h-screen bg-bg">
      <AdminSidebar />
      
      <main className="flex-1 overflow-auto">
        {/* Top Bar */}
        <div className="bg-surface border-b border-border p-6 flex items-center justify-between">
          <div>
            <h1 className="font-playfair text-3xl font-bold text-ink">Charity Management</h1>
            <p className="text-muted mt-1">Manage charities in the platform</p>
          </div>
          <Button onClick={() => setShowForm(true)}>
            Add New Charity
          </Button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Charities Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {charities.map(charity => (
              <div key={charity.id} className="bg-surface rounded-lg border border-border overflow-hidden hover:shadow-lg transition-shadow">
                {/* Header */}
                <div className="p-6 border-b border-border bg-gradient-to-r from-accent-light to-bg">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-4xl">{charity.icon}</span>
                    <div>
                      <h3 className="font-bold text-ink font-playfair">{charity.name}</h3>
                      <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">
                        {charity.status}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-muted">{charity.description}</p>
                </div>

                {/* Details */}
                <div className="p-6 space-y-3">
                  <div>
                    <p className="text-xs text-muted mb-1">Category</p>
                    <p className="font-600 text-ink">{charity.category}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted mb-1">Total Donations</p>
                    <p className="font-playfair text-2xl font-bold text-gold">
                      {formatters.currency(charity.totalDonated)}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-xs text-muted mb-1">Supporters</p>
                      <p className="font-600 text-ink">{charity.supporters.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted mb-1">Avg Donation</p>
                      <p className="font-600 text-accent">
                        {formatters.currency(charity.totalDonated / charity.supporters)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="px-6 pb-6 flex gap-2">
                  <button
                    onClick={() => setSelectedCharity(charity)}
                    className="flex-1 px-4 py-2 rounded-lg bg-blue-100 text-blue-700 font-600 text-sm hover:bg-blue-200"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteCharity(charity.id)}
                    className="flex-1 px-4 py-2 rounded-lg bg-red-100 text-red-700 font-600 text-sm hover:bg-red-200"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Add/Edit Charity Form Modal */}
          {showForm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-surface rounded-lg p-8 max-w-md w-full max-h-96 overflow-y-auto">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-playfair text-2xl font-bold text-ink">Add New Charity</h2>
                  <button
                    onClick={() => {
                      setShowForm(false);
                      setFormData({ name: '', description: '', category: '', website: '', icon: '' });
                    }}
                    className="text-ink hover:text-muted text-2xl"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-4 mb-6">
                  <Input
                    label="Charity Name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g., Save the Children"
                    required
                  />

                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-500 text-ink">
                      Description
                      <span className="text-red-500 ml-1">*</span>
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Brief description of the charity"
                      className="px-4 py-3 rounded-lg border border-border bg-surface text-ink placeholder-muted focus:outline-none focus:ring-2 focus:ring-accent"
                      rows="3"
                    />
                  </div>

                  <Input
                    label="Category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    placeholder="e.g., Child Welfare, Wildlife, Environment"
                    required
                  />

                  <Input
                    label="Website"
                    name="website"
                    type="url"
                    value={formData.website}
                    onChange={handleInputChange}
                    placeholder="https://example.org"
                    required
                  />

                  <Input
                    label="Icon (Emoji)"
                    name="icon"
                    value={formData.icon}
                    onChange={handleInputChange}
                    placeholder="e.g., 🤝"
                    required
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setShowForm(false);
                      setFormData({ name: '', description: '', category: '', website: '', icon: '' });
                    }}
                    className="flex-1 px-4 py-2 rounded-lg bg-bg text-ink font-600 hover:bg-opacity-80"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveCharity}
                    className="flex-1 px-4 py-2 rounded-lg bg-accent text-white font-600 hover:bg-opacity-90"
                  >
                    Add Charity
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Edit Modal */}
          {selectedCharity && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-surface rounded-lg p-8 max-w-md w-full max-h-96 overflow-y-auto">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-playfair text-2xl font-bold text-ink">
                    Edit {selectedCharity.name}
                  </h2>
                  <button
                    onClick={() => setSelectedCharity(null)}
                    className="text-ink hover:text-muted text-2xl"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-4 mb-6">
                  <div>
                    <p className="text-sm text-muted mb-1">Name</p>
                    <p className="font-600 text-ink">{selectedCharity.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted mb-1">Category</p>
                    <p className="font-600 text-ink">{selectedCharity.category}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted mb-1">Total Donated</p>
                    <p className="font-600 text-gold text-lg">
                      {formatters.currency(selectedCharity.totalDonated)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted mb-1">Supporters</p>
                    <p className="font-600 text-ink">{selectedCharity.supporters.toLocaleString()}</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setSelectedCharity(null)}
                    className="flex-1 px-4 py-2 rounded-lg bg-bg text-ink font-600 hover:bg-opacity-80"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      handleDeleteCharity(selectedCharity.id);
                      setSelectedCharity(null);
                    }}
                    className="flex-1 px-4 py-2 rounded-lg bg-red-100 text-red-700 font-600 hover:bg-red-200"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

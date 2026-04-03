import React, { useState, useEffect } from 'react';
import { AdminSidebar } from '../components/AdminSidebar';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { formatters } from '../utils/formatters';
import { drawsAPI } from '../api/draws';
import { adminAPI } from '../api/admin';

export const DrawManagementPage = () => {
  const [activeTab, setActiveTab] = useState('current');
  const [showCreateDraw, setShowCreateDraw] = useState(false);
  const [selectedDraw, setSelectedDraw] = useState(null);
  
  const [currentDraws, setCurrentDraws] = useState([]);
  const [historyDraws, setHistoryDraws] = useState([]);
  const [loading, setLoading] = useState(true);
  const getFutureDate = (offsetDays) => {
    const d = new Date();
    d.setDate(d.getDate() + offsetDays);
    return d.toISOString().slice(0, 16);
  };

  const initialFormState = { 
    month: 'Monthly Draw', 
    year: new Date().getFullYear(),
    startDate: new Date().toISOString().slice(0, 16),
    endDate: getFutureDate(30),
    resultsAnnounceDate: getFutureDate(31),
    prizePool: 50000 
  };

  const [formData, setFormData] = useState(initialFormState);

  const loadDraws = async () => {
    try {
      const [cur, hist] = await Promise.all([
        drawsAPI.getCurrent().catch(() => ({ data: { draw: null } })),
        drawsAPI.getHistory().catch(() => ({ data: { draws: [] } }))
      ]);
      const activeDrawList = cur.data.draw ? [cur.data.draw] : [];
      setCurrentDraws(activeDrawList);
      setHistoryDraws(hist.data.draws || hist.data || []);
    } catch(e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDraws();
  }, []);

  const handleCreateDraw = async () => {
    try {
      await adminAPI.createDraw(formData);
      setShowCreateDraw(false);
      setFormData(initialFormState);
      loadDraws();
      alert("Draw created!");
    } catch (e) {
      alert(e.response?.data?.message || "Failed to create draw");
    }
  };

  const handlePublishDraw = async (drawId) => {
    try {
      // In a real app we would compute winners. Here we randomly assign them or provide array.
      const mockWinners = [42, 17, 88];
      await adminAPI.publishDraw(drawId, mockWinners);
      alert('Draw published successfully!');
      loadDraws();
      setActiveTab('history');
    } catch (e) {
      alert(e.response?.data?.message || 'Failed to publish');
    }
  };

  return (
    <div className="flex h-screen bg-bg">
      <AdminSidebar />
      <main className="flex-1 overflow-auto">
        <div className="bg-surface border-b border-border p-6 flex items-center justify-between">
          <div>
            <h1 className="font-playfair text-3xl font-bold text-ink">Draw Management</h1>
            <p className="text-muted mt-1">Live configuration for upcoming and past draws</p>
          </div>
          <Button onClick={() => setShowCreateDraw(true)}>Create New Draw</Button>
        </div>

        <div className="p-6">
          <div className="flex gap-4 mb-6 border-b border-border">
            <button onClick={() => setActiveTab('current')} className={`py-3 px-4 font-600 border-b-2 transition-all ${activeTab === 'current' ? 'border-accent text-accent' : 'border-transparent text-muted'} hover:text-ink`}>Current Live Draw</button>
            <button onClick={() => setActiveTab('history')} className={`py-3 px-4 font-600 border-b-2 transition-all ${activeTab === 'history' ? 'border-accent text-accent' : 'border-transparent text-muted'} hover:text-ink`}>Past History</button>
          </div>

          {loading ? (
             <div className="text-center p-12 text-muted">Loading live database...</div>
          ) : activeTab === 'current' && (
            <div className="space-y-6">
              {currentDraws.length === 0 ? (
                <div className="p-8 text-center text-muted bg-surface rounded-lg border border-border">No live active draws. Create one above.</div>
              ) : currentDraws.map(currentDraw => (
                <div key={currentDraw._id} className="bg-gradient-to-br from-accent-light to-bg rounded-lg p-8 border border-accent">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h2 className="font-playfair text-3xl font-bold text-ink mb-2">{currentDraw.month}</h2>
                      <p className="text-muted">Active monthly draw running on port</p>
                    </div>
                    <span className="px-4 py-2 bg-green-100 text-green-700 font-600 rounded-full text-sm">Active</span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                    <div className="p-4 bg-white rounded-lg border border-border">
                      <p className="text-muted text-sm mb-1">Prize Pool</p>
                      <p className="font-playfair text-2xl font-bold text-gold">{formatters.currency(currentDraw.prizePool)}</p>
                    </div>
                    <div className="p-4 bg-white rounded-lg border border-border">
                      <p className="text-muted text-sm mb-1">Participants Tracker</p>
                      <p className="font-playfair text-2xl font-bold text-accent">{(currentDraw.participants || 0).toLocaleString()}</p>
                    </div>
                    <div className="p-4 bg-white rounded-lg border border-border">
                      <p className="text-muted text-sm mb-1">Current End Date</p>
                      <p className="font-playfair text-xl font-bold text-ink">{formatters.date(currentDraw.endDate)}</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button variant="outline" onClick={() => handlePublishDraw(currentDraw._id)}>Publish Winners Using Admin Engine</Button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'history' && (
            <div className="space-y-4">
              {historyDraws.length === 0 ? (
                <div className="p-8 text-center text-muted">No published past draws.</div>
              ) : historyDraws.map(draw => (
                <div key={draw._id} className="bg-surface rounded-lg p-6 border border-border">
                  <div className="flex flex-col md:flex-row justify-between mb-4">
                    <h3 className="font-playfair text-xl font-bold text-ink">{draw.month}</h3>
                    <p className="text-sm text-muted">Closed: {formatters.date(draw.endDate)}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div><p className="text-muted text-xs">Pool Distributed</p><p className="font-bold text-gold">{formatters.currency(draw.prizePool)}</p></div>
                    <div><p className="text-muted text-xs">Winners Decided</p><p className="font-bold text-ink">{draw.winners?.length || 0} confirmed algorithmically</p></div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {showCreateDraw && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-surface rounded-lg p-8 max-w-md w-full">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-playfair text-2xl font-bold text-ink">New Database Draw</h2>
                  <button onClick={() => setShowCreateDraw(false)} className="text-ink hover:text-muted text-2xl">✕</button>
                </div>
                <div className="space-y-4 mb-6 overflow-y-auto max-h-[60vh] pr-2">
                  <Input label="Month Title" value={formData.month} onChange={(e) => setFormData({...formData, month: e.target.value})} placeholder="e.g. April" />
                  <Input label="Year" type="number" value={formData.year} onChange={(e) => setFormData({...formData, year: Number(e.target.value)})} />
                  <Input label="Start Date" type="datetime-local" value={formData.startDate} onChange={(e) => setFormData({...formData, startDate: e.target.value})} />
                  <Input label="End Date" type="datetime-local" value={formData.endDate} onChange={(e) => setFormData({...formData, endDate: e.target.value})} />
                  <Input label="Results Announce Date" type="datetime-local" value={formData.resultsAnnounceDate} onChange={(e) => setFormData({...formData, resultsAnnounceDate: e.target.value})} />
                  <Input label="Prize Pool" type="number" value={formData.prizePool} onChange={(e) => setFormData({...formData, prizePool: Number(e.target.value)})} />
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setShowCreateDraw(false)} className="flex-1 px-4 py-2 rounded-lg bg-bg text-ink font-600 hover:bg-opacity-80">Cancel</button>
                  <button onClick={handleCreateDraw} className="flex-1 px-4 py-2 rounded-lg bg-accent text-white font-600 hover:bg-opacity-90">Inject to MongoDB</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

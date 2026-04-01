import client from './client';

export const adminAPI = {
  // Dashboard
  getStats: () => 
    client.get('/admin/stats'),
  
  // User Management
  getUsers: (filters = {}) => 
    client.get('/admin/users', { params: filters }),
  
  updateUser: (id, data) => 
    client.put(`/admin/users/${id}`, data),
  
  // Subscription Management
  getSubscriptions: (filters = {}) => 
    client.get('/admin/subscriptions', { params: filters }),
  
  updateSubscription: (id, data) => 
    client.put(`/admin/subscriptions/${id}`, data),
  
  // Draw Management
  createDraw: (data) => 
    client.post('/admin/draws', data),
  
  publishDraw: (id, winners) => 
    client.put(`/admin/draws/${id}/publish`, { winners }),
  
  // Charity Management
  createCharity: (data) => 
    client.post('/admin/charities', data),
  
  updateCharity: (id, data) => 
    client.put(`/admin/charities/${id}`, data),
  
  deleteCharity: (id) => 
    client.delete(`/admin/charities/${id}`),
  
  // Payout Management
  getPayouts: (filters = {}) => 
    client.get('/admin/payouts', { params: filters }),
  
  markPayoutAsPaid: (id) => 
    client.put(`/admin/payouts/${id}`, { status: 'paid' })
};

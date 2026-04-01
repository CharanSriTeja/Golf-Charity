import client from './client';

export const adminAPI = {
  // Dashboard
  getStats: () => 
    client.get('/admin/stats'),
  
  // User Management
  getUsers: (filters = {}) => 
    client.get('/users', { params: filters }),
  
  updateUser: (id, data) => 
    client.put(`/users/${id}`, data),
  
  // Subscription Management
  getSubscriptions: (filters = {}) => 
    client.get('/payments/transactions', { params: filters }),
  
  updateSubscription: (id, data) => 
    client.put(`/payments/transactions/${id}`, data),
  
  // Draw Management
  createDraw: (data) => 
    client.post('/draws', data),
  
  publishDraw: (id, winners) => 
    client.put(`/draws/${id}/publish`, { winners }),
  
  // Charity Management
  createCharity: (data) => 
    client.post('/charities', data),
  
  updateCharity: (id, data) => 
    client.put(`/charities/${id}`, data),
  
  deleteCharity: (id) => 
    client.delete(`/charities/${id}`),
  
  // Payout Management
  getPayouts: (filters = {}) => 
    client.get('/payouts', { params: filters }),
  
  markPayoutAsPaid: (id) => 
    client.put(`/payouts/${id}`, { status: 'paid' })
};

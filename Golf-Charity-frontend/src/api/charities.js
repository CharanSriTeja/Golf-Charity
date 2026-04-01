import client from './client';

export const charitiesAPI = {
  getAll: () => 
    client.get('/charities'),
  
  getById: (id) => 
    client.get(`/charities/${id}`),
  
  search: (query) => 
    client.get('/charities/search', { params: { q: query } })
};

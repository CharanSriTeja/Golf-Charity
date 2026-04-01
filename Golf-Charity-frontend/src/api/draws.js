import client from './client';

export const drawsAPI = {
  getAll: () => 
    client.get('/draws'),
  
  getById: (id) => 
    client.get(`/draws/${id}`),
  
  getCurrent: () => 
    client.get('/draws/current'),
  
  getHistory: (limit = 12) => 
    client.get('/draws/history', { params: { limit } })
};

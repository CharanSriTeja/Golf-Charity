import client from './client';

export const drawsAPI = {
  getCurrent: () => client.get('/draws/active'),
  getHistory: (params) => client.get('/draws', { params }),
  getDrawById: (id) => client.get(`/draws/${id}`)
};

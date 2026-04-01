import client from './client';

export const charitiesAPI = {
  getAll: () => 
    client.get('/charities'),
  
  getById: (id) => 
    client.get(`/charities/${id}`),
  
  search: (query, category) => {
    const params = {};
    if (query) params.search = query;
    if (category && category !== 'All') params.category = category;
    return client.get('/charities', { params });
  },

  selectCharity: (charityId) =>
    client.post('/charities/select', { charityId }),

  getMyCharity: () =>
    client.get('/charities/my-charity')
};

import client from './client';

export const authAPI = {
  signup: (email, password, name, charityId) => 
    client.post('/auth/signup', { email, password, name, charityId }),
  
  login: (email, password) => 
    client.post('/auth/login', { email, password }),
  
  logout: () => 
    client.post('/auth/logout'),
  
  refreshToken: () => 
    client.post('/auth/refresh'),
  
  forgotPassword: (email) => 
    client.post('/auth/forgot-password', { email }),
  
  resetPassword: (token, newPassword) => 
    client.post('/auth/reset-password', { token, newPassword })
};

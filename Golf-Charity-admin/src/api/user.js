import client from './client';

export const userAPI = {
  getProfile: () => 
    client.get('/users/profile'),
  
  updateProfile: (data) => 
    client.put('/users/profile', data),
  
  getScores: () => 
    client.get('/users/scores'),
  
  updateScores: (scores) => 
    client.post('/users/scores', { scores }),
  
  getCharity: () => 
    client.get('/users/charity'),
  
  updateCharity: (charityId, donationPercentage) => 
    client.put('/users/charity', { charityId, donationPercentage }),
  
  getWinnings: () => 
    client.get('/users/winnings'),
  
  getDraws: () => 
    client.get('/users/draws')
};

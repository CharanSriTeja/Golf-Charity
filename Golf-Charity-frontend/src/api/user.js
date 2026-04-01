import client from './client';

export const userAPI = {
  getProfile: () => 
    client.get('/user/profile'),
  
  updateProfile: (data) => 
    client.put('/user/profile', data),
  
  getScores: () => 
    client.get('/user/scores'),
  
  updateScores: (scores) => 
    client.post('/user/scores', { scores }),
  
  getCharity: () => 
    client.get('/user/charity'),
  
  updateCharity: (charityId, donationPercentage) => 
    client.put('/user/charity', { charityId, donationPercentage }),
  
  getWinnings: () => 
    client.get('/user/winnings'),
  
  getDraws: () => 
    client.get('/user/draws')
};

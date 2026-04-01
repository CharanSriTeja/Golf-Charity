import client from './client';

export const statsApi = {
  // Get public stats for landing page
  getPublicStats: async () => {
    const response = await client.get('/stats/public');
    return response.data;
  },

  // Get recent winners
  getRecentWinners: async (limit = 3) => {
    const response = await client.get(`/stats/winners?limit=${limit}`);
    return response.data;
  },

  // Get user dashboard stats
  getDashboardStats: async () => {
    const response = await client.get('/stats/dashboard');
    return response.data;
  },

  // Get leaderboard
  getLeaderboard: async (month, year) => {
    const params = new URLSearchParams();
    if (month) params.append('month', month);
    if (year) params.append('year', year);
    const response = await client.get(`/stats/leaderboard?${params.toString()}`);
    return response.data;
  }
};

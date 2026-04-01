import { apiClient } from "./client";

export const razorpayApi = {
  // Create a Razorpay order
  createOrder: async (plan) => {
    try {
      const response = await apiClient.post("/payments/create-order", { plan });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Verify payment
  verifyPayment: async (paymentData) => {
    try {
      const response = await apiClient.post("/payments/verify", paymentData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Get subscription plans
  getPlans: async () => {
    try {
      const response = await apiClient.get("/payments/plans");
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Get transaction history
  getTransactions: async (params = {}) => {
    try {
      const response = await apiClient.get("/payments/transactions", { params });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Cancel subscription
  cancelSubscription: async () => {
    try {
      const response = await apiClient.post("/payments/cancel-subscription");
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
};

// Load Razorpay script
export const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (document.getElementById('razorpay-script')) {
      resolve(true);
      return;
    }
    const script = document.createElement('script');
    script.id = 'razorpay-script';
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

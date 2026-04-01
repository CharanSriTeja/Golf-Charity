import { apiClient } from "./client";

export const stripeApi = {
  // Create a checkout session
  createCheckoutSession: async (subscriptionTier, priceId) => {
    try {
      const response = await apiClient.post("/stripe/checkout-session", {
        subscriptionTier,
        priceId,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Verify payment success
  verifyPayment: async (sessionId) => {
    try {
      const response = await apiClient.get(`/stripe/verify-payment/${sessionId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Get subscription status
  getSubscriptionStatus: async () => {
    try {
      const response = await apiClient.get("/stripe/subscription-status");
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Cancel subscription
  cancelSubscription: async () => {
    try {
      const response = await apiClient.post("/stripe/cancel-subscription");
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Get invoice history
  getInvoices: async (limit = 10) => {
    try {
      const response = await apiClient.get("/stripe/invoices", {
        params: { limit },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Update payment method
  updatePaymentMethod: async (paymentMethodId) => {
    try {
      const response = await apiClient.post("/stripe/update-payment-method", {
        paymentMethodId,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
};

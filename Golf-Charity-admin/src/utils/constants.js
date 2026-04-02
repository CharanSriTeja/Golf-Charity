// App Configuration
export const APP_NAME = 'PlayGiveWin';
export const APP_DESCRIPTION = 'Play score prediction contests, win real prizes, and support verified charities.';

// API Configuration
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
export const STRIPE_PUBLIC_KEY = import.meta.env.VITE_STRIPE_PUBLIC_KEY;

// User Roles
export const ROLES = {
  USER: 'user',
  ADMIN: 'admin',
  MODERATOR: 'moderator'
};

// Subscription Plans
export const SUBSCRIPTION_PLANS = {
  FREE: 'free',
  MONTHLY: 'monthly',
  YEARLY: 'yearly'
};

export const PLAN_PRICES = {
  MONTHLY: { INR: 1, USD: 1 },
  YEARLY: { INR: 10, USD: 10 }
};

// Golf Scoring
export const STABLEFORD_RANGE = {
  MIN: 1,
  MAX: 45
};

// Draw Configuration
export const DRAW_CONFIG = {
  MONTHLY: 'monthly',
  WEEKLY: 'weekly',
  MIN_SCORES_REQUIRED: 5,
  DRAW_TIME: '20:00' // 8 PM IST
};

// Donation Ranges
export const DONATION_PERCENTAGE_RANGE = {
  MIN: 10,
  MAX: 40
};

// Pagination
export const PAGINATION = {
  DEFAULT_LIMIT: 20,
  DEFAULT_OFFSET: 0
};

// Error Messages
export const ERROR_MESSAGES = {
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  NOT_FOUND: 'The resource you are looking for was not found.',
  INTERNAL_ERROR: 'An internal server error occurred. Please try again later.',
  NETWORK_ERROR: 'Network error. Please check your connection.',
  INVALID_CREDENTIALS: 'Invalid email or password.',
  EMAIL_EXISTS: 'An account with this email already exists.',
  VALIDATION_ERROR: 'Please check your input and try again.'
};

// Success Messages
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Login successful!',
  SIGNUP_SUCCESS: 'Account created successfully!',
  UPDATE_SUCCESS: 'Updated successfully!',
  DELETE_SUCCESS: 'Deleted successfully!',
  PAYMENT_SUCCESS: 'Payment processed successfully!'
};

// Toast Duration (milliseconds)
export const TOAST_DURATION = {
  SHORT: 3000,
  MEDIUM: 5000,
  LONG: 7000
};

// Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'authToken',
  USER: 'user',
  PREFERENCES: 'preferences',
  CART: 'cart'
};

// Date Formats
export const DATE_FORMATS = {
  DISPLAY_DATE: 'dd MMM yyyy',
  DISPLAY_TIME: 'HH:mm',
  DISPLAY_DATETIME: 'dd MMM yyyy, HH:mm',
  ISO_DATE: "yyyy-MM-dd'T'HH:mm:ss.SSSxxx"
};

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500
};

// Responsive Breakpoints
export const BREAKPOINTS = {
  MOBILE: '320px',
  TABLET: '768px',
  DESKTOP: '1200px'
};

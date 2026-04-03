import { format, formatDistanceToNow, parseISO } from 'date-fns';

export const formatters = {
  date: (date, formatStr = 'dd MMM yyyy') => {
    try {
      const d = typeof date === 'string' ? parseISO(date) : date;
      return format(d, formatStr);
    } catch {
      return '';
    }
  },

  time: (date) => {
    try {
      const d = typeof date === 'string' ? parseISO(date) : date;
      return format(d, 'HH:mm');
    } catch {
      return '';
    }
  },

  dateTime: (date) => {
    try {
      const d = typeof date === 'string' ? parseISO(date) : date;
      return format(d, 'dd MMM yyyy, HH:mm');
    } catch {
      return '';
    }
  },

  relativeTime: (date) => {
    try {
      const d = typeof date === 'string' ? parseISO(date) : date;
      return formatDistanceToNow(d, { addSuffix: true });
    } catch {
      return '';
    }
  },

  currency: (value, currency = 'INR') => {
    try {
      return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency,
        minimumFractionDigits: 0
      }).format(value);
    } catch {
      return value;
    }
  },

  number: (value, decimals = 0) => {
    try {
      return Number(value).toFixed(decimals);
    } catch {
      return value;
    }
  },

  percentage: (value, decimals = 1) => {
    try {
      return `${(value * 100).toFixed(decimals)}%`;
    } catch {
      return value;
    }
  }
};

export const validators = {
  email: (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  },

  password: (password) => {
    // At least 8 chars, 1 uppercase, 1 lowercase, 1 number
    return password && password.length >= 8;
  },

  passwordStrength: (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  },

  phoneNumber: (phone) => {
    const re = /^[\d\s\-\+\(\)]{10,}$/;
    return re.test(phone);
  },

  url: (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  },

  required: (value) => {
    if (typeof value === 'string') return value.trim().length > 0;
    if (Array.isArray(value)) return value.length > 0;
    return !!value;
  },

  minLength: (value, min) => {
    return value && value.length >= min;
  },

  maxLength: (value, max) => {
    return value && value.length <= max;
  },

  min: (value, min) => {
    return Number(value) >= min;
  },

  max: (value, max) => {
    return Number(value) <= max;
  },

  range: (value, min, max) => {
    return Number(value) >= min && Number(value) <= max;
  },

  match: (value, pattern) => {
    return pattern.test(value);
  }
};

export const validateForm = (values, schema) => {
  const errors = {};
  
  for (const [key, rules] of Object.entries(schema)) {
    const value = values[key];
    
    for (const rule of rules) {
      if (typeof rule === 'function') {
        if (!rule(value)) {
          errors[key] = `Validation failed for ${key}`;
          break;
        }
      } else if (rule.validate && !rule.validate(value)) {
        errors[key] = rule.message || `Validation failed for ${key}`;
        break;
      }
    }
  }
  
  return errors;
};

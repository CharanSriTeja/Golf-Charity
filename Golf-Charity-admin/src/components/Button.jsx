import React from 'react';

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  loading = false,
  className = '',
  ...props
}) => {
  const baseStyles = 'font-sans font-600 rounded-full transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer border-none outline-none';
  
  const sizeStyles = {
    sm: 'px-4 py-2 text-13px',
    md: 'px-7 py-3 text-15px',
    lg: 'px-8 py-4 text-16px'
  };

  const variantStyles = {
    primary: 'bg-accent text-white hover:bg-opacity-90 active:scale-95',
    outline: 'bg-transparent text-accent border-2 border-accent hover:bg-accent-light active:scale-95',
    secondary: 'bg-muted text-white hover:bg-opacity-90 active:scale-95',
    ghost: 'bg-transparent text-accent hover:bg-accent-light active:scale-95'
  };

  const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed' : '';
  const widthStyles = fullWidth ? 'w-full' : '';

  return (
    <button
      className={`
        ${baseStyles}
        ${sizeStyles[size]}
        ${variantStyles[variant]}
        ${disabledStyles}
        ${widthStyles}
        ${className}
      `}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {children}
    </button>
  );
};

import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  className = '',
  ...props 
}) => {
  const baseStyle = "font-bold py-2 px-6 rounded-lg transition-colors";
  const variants = {
    primary: "bg-primary hover:bg-primary-dark text-white",
    secondary: "bg-calm-blue hover:bg-calm-green text-primary-dark",
    danger: "bg-red-500 hover:bg-red-600 text-white"
  };

  return (
    <button 
      className={`${baseStyle} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

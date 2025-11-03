
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', ...props }) => {
  const baseClasses = 'px-8 py-3 font-bold rounded-lg transition-all duration-300 focus:outline-none focus:ring-4 disabled:cursor-not-allowed transform hover:-translate-y-0.5';

  const variantClasses = {
    primary: 'bg-gradient-to-r from-teal-500 to-cyan-600 text-white hover:from-teal-600 hover:to-cyan-700 focus:ring-teal-500/50 disabled:from-gray-600 disabled:to-gray-700 disabled:text-gray-400 disabled:transform-none',
    secondary: 'bg-gray-700 text-gray-300 hover:bg-gray-600 focus:ring-gray-600/50 disabled:bg-gray-800 disabled:text-gray-500 disabled:transform-none',
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;

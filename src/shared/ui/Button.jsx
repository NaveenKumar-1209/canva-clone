import React from 'react';
import { Loader2 } from 'lucide-react';

const Button = ({ children, variant = 'primary', isLoading, className = '', ...props }) => {
  const baseStyles = "w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium transition-all focus:ring-4 focus:ring-indigo-100 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/40",
    secondary: "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 hover:border-gray-300",
    ghost: "bg-transparent text-indigo-600 hover:bg-indigo-50",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      disabled={isLoading}
      {...props}
    >
      {isLoading && <Loader2 size={18} className="animate-spin" />}
      {children}
    </button>
  );
};

export default Button;

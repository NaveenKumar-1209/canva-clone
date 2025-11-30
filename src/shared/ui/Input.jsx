import React from 'react';

const Input = ({ label, type = 'text', placeholder, value, onChange, icon: Icon, ...props }) => {
  return (
    <div className="space-y-1.5">
      {label && <label className="text-sm font-medium text-gray-700 block">{label}</label>}
      <div className="relative group">
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 transition-colors">
            <Icon size={18} />
          </div>
        )}
        <input
          type={type}
          className={`w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent block p-3 transition-all outline-none ${Icon ? 'pl-10' : ''}`}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          {...props}
        />
      </div>
    </div>
  );
};

export default Input;

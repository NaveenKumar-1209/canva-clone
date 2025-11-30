import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center h-screen w-full bg-gray-50">
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="animate-spin text-indigo-600" size={48} />
        <p className="text-gray-500 font-medium">Loading...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;

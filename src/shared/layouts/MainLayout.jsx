import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import LoadingSpinner from '../ui/LoadingSpinner';

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* We can add a global header or sidebar here if needed later */}
      <Suspense fallback={<LoadingSpinner />}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default MainLayout;

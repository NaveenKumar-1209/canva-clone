import React, { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../shared/layouts/MainLayout';

// Lazy load pages
const Dashboard = lazy(() => import('../pages/Dashboard'));
const Editor = lazy(() => import('../pages/Editor'));
const Login = lazy(() => import('../pages/Login'));
const Register = lazy(() => import('../pages/Register'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: 'editor/:id',
        element: <Editor />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
    ],
  },
]);

export default router;

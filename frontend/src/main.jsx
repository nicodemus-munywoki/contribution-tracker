import { Children, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { createBrowserRouter, RouterProvider } from 'react-router';
import Dashboard from './routes/Dashboard';
import MainLayout from './layout/MainLayout';

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <Dashboard />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

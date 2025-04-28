import React from 'react';
import ReactDOM from 'react-dom/client';
import Layout from './Layout.jsx';
import './index.css';
import 'vite/modulepreload-polyfill';
import { createHashRouter, RouterProvider } from 'react-router';
import { Home } from './pages/Home.jsx'; // Import Home component
import { NataliesPage } from './pages/Natalie.jsx'; // Import Natalie component

const router = createHashRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/", // Default route
        element: <Home /> // Render Home component at startup
      },
      {
        path: "natalie", // Route for Natalie page
        element: <NataliesPage />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />,
);
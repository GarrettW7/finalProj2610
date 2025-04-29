import React from 'react';
import ReactDOM from 'react-dom/client';
import Layout from './Layout.jsx';
import './style/index.css';
import './style/layout.css';
import 'vite/modulepreload-polyfill';
import { createHashRouter, RouterProvider } from 'react-router';
import { Home } from './pages/Home.jsx'; // Import Home component
import { NataliesPage } from './pages/Natalie.jsx'; // Import Natalie component
import { JarvisPage } from './pages/Jarvis.jsx'; // Import Jarvis component

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
      },
      {
        path: "jarvis", // Route for Natalie page
        element: <JarvisPage />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />,
);
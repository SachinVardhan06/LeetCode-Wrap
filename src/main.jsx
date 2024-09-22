import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client'; // Added this import
import './index.css';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import Layout from '../Layout.jsx';
import Home from './components/Home.jsx';
import DashBoard from './components/DashBoard.jsx';

// Create the router
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="" element={<Home />} /> 
      <Route path="user/:username" element={<DashBoard/>} />
    </Route>
  )
);

// Render the app
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './Components/Layout.jsx';  
import Home from './pages/Home.jsx';  
import Admin from './pages/Admin.jsx';
import Notfound from './pages/Notfound.jsx'; 
import './index.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, 
    children: [
      { path: "/", element: <Home /> },
      { path: "admin", element: <Admin /> }, // Ensure correct path here
      { path: "*", element: <Notfound /> }, // Catch-all for 404
    ],
  },
]);


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);


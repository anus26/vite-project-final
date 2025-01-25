import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home.jsx';  // Corrected import
import Layout from './Components/Layout.jsx';  // Assuming Layout exists
import Notfound from './pages/Notfound.jsx'; // Assuming Notfound exists
import './index.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, 
    children: [
      { path: "/", element: <Home /> }, 
      { path: "*", element: <Notfound /> }, // Catch-all for 404
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);


// Layout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import ResponsiveAppBar from './Navabar';

const Layout = () => {
  return (
    <div>
    <ResponsiveAppBar/>
      
        <Outlet /> {/* Render child routes here */}
    
    </div>
  );
};

export default Layout;

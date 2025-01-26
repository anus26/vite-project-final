import React from 'react';
import { Outlet } from 'react-router-dom';
import ResponsiveAppBar from './Navabar.jsx';

const Layout = () => {
  return (
    <>
      <ResponsiveAppBar />
      <Outlet />
    </>
  );
};

export default Layout;



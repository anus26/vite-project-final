import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div>
      <header>
        {/* Your header, navbar, etc. */}
      </header>
      <main>
        <Outlet />  {/* This renders the child routes */}
      </main>
    </div>
  );
};

export default Layout;

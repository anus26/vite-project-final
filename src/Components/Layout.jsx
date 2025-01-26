import { Outlet } from 'react-router-dom';
import { ResponsiveAppBar} from './Components/Navabar.jsx';  // Correct path

const Layout = () => {
  return (
    <>
     
        <ResponsiveAppBar />
        <Outlet />  {/* This renders the child routes */}
      
    </>
  );
};

export default Layout;



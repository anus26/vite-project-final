import { Outlet } from 'react-router-dom';
import { ResponsiveAppBar} from './Components/Navabar.jsx';  // Correct path

const Layout = () => {
  return (
    <div>
     
        <ResponsiveAppBar />
      
    
        <Outlet />  {/* This renders the child routes */}
      
    </div>
  );
};

export default Layout;



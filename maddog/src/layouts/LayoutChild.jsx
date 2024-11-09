import { Outlet } from 'react-router';

import NavBar from '../components/Navbar/NavBar';

export const LayoutChild = () => {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};

// <div className='container'>
//   <NavBar />
//   <Outlet />
// </div>
import { Outlet } from 'react-router';

import NavBar from '../components/navbar/NavBar';

export const LayoutChild = () => {
  return (
    <div className='container'>
      <NavBar />
      <Outlet />
    </div>
  );
};
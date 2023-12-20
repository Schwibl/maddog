import { Outlet } from "react-router";
import NavBar from '../components/navbar/NavBar';

export const Layout = () => {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};

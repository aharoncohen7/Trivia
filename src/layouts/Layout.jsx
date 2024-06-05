import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header';

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default Layout;








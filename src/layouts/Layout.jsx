import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header';

const Layout = ({ children }) => {
  return (
    <div className='h-full min-h-screen'>
      <Header />
      {children}
    </div>
  );
};

export default Layout;








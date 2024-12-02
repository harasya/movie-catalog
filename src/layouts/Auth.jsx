import React from 'react';

const Layout = ({ children }) => {
  return (
    <div className='auth-layout'>
      <div className='auth-layout__content'>{children}</div>
      <div className='auth-layout__image'>
      </div>
    </div>
  );
};

export default Layout;
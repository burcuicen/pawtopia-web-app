// In layouts/MainLayout.tsx
import React from 'react';
import PHeader from '../../components/p-header';
import PFooter from '../../components/p-footer';

type MainLayoutProps = {
  children: React.ReactNode;
};

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className='main-layout'>
      <PHeader />
      <main>{children}</main>
      <PFooter />
    </div>
  );
};

export default MainLayout;

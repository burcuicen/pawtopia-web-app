import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setIsMobile } from './store/reducers/isMobileSlice';

import MainLayout from './layouts/main';
import Landing from './pages/landing';
import { useCheckLoginStatus } from './helpers/auth';

const App: React.FC = () => {
  useCheckLoginStatus();

  const dispatch = useDispatch();

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      dispatch(setIsMobile(mobile));
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [dispatch]);
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Landing />} />
        </Routes>
      </MainLayout>
    </Router>
  );
};

export default App;

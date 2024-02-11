import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/main';
import Landing from './pages/landing';
const App: React.FC = () => {
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

import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { setIsMobile } from 'src/store/reducers/isMobileSlice'
import { useCheckLoginStatus } from 'src/helpers/auth'

import MainLayout from 'src/layouts/main'
import Landing from 'src/pages/landing'
import Login from 'src/pages/login'
import Logout from './pages/logout'
import Signup from 'src/pages/signup'
import Survey from 'src/pages/survey'

const App: React.FC = () => {
  useCheckLoginStatus()

  const dispatch = useDispatch()

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768
      dispatch(setIsMobile(mobile))
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [dispatch])
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/onboarding" element={<Survey />} />
        </Routes>
      </MainLayout>
    </Router>
  )
}

export default App

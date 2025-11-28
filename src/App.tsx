import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { setIsMobile } from 'src/store/reducers/isMobileSlice'
import { useCheckLoginStatus } from 'src/helpers/auth'

import MainLayout from 'src/layouts/main'
import Landing from 'src/pages/landing'
import Login from 'src/pages/login'
import Logout from './pages/logout'
import Signup from 'src/pages/signup'
import Survey from 'src/pages/survey'
import PetsBrowse from 'src/pages/pets'
import PetDetail from 'src/pages/pet-detail'

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
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Router>
        <MainLayout>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/pets" element={<PetsBrowse />} />
            <Route path="/pets/:id" element={<PetDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/onboarding" element={<Survey />} />
          </Routes>
        </MainLayout>
      </Router>
    </>
  )
}

export default App

import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from 'src/store'

const AdminRoute: React.FC = () => {
  const { isLoggedIn, userInfo, isAuthChecking } = useSelector((state: RootState) => state.auth)

  if (isAuthChecking) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!isLoggedIn || userInfo?.userType !== 'paw-admin') {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}

export default AdminRoute

import React from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from 'src/store'

interface ProtectedRouteProps {
  children: React.ReactElement
  redirectTo?: string
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  redirectTo = '/login' 
}) => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn)

  if (!isLoggedIn) {
    return <Navigate to={redirectTo} replace />
  }

  return children
}

export default ProtectedRoute

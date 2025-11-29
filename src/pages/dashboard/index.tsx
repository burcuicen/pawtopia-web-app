import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Dashboard: React.FC = () => {
  const navigate = useNavigate()

  useEffect(() => {
    navigate('/dashboard/listings')
  }, [navigate])

  return null
}

export default Dashboard

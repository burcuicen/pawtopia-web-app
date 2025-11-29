import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import BaseIcon from 'src/components/_base/base-icon'
import './styles.scss'

interface DashboardLayoutProps {
  children: React.ReactNode
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const navigate = useNavigate()
  const location = useLocation()

  const menuItems = [
    {
      label: 'Listings',
      icon: 'mdi-light:format-list-checks',
      path: '/dashboard/listings'
    },
    {
      label: 'Users',
      icon: 'solar:user-outline',
      path: '/dashboard/users'
    },
    {
      label: 'Settings',
      icon: 'material-symbols:settings-outline',
      path: '/dashboard/settings'
    }
  ]

  return (
    <div className="dashboard-layout">
      <div className="dashboard-layout__sidebar">
        <div className="dashboard-layout__sidebar-logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          <img src={require('../../assets/logo.png')} alt="Pawtopia" />
        </div>

        <div className="dashboard-layout__sidebar-menu">
          {menuItems.map((item) => (
            <div
              key={item.path}
              className={`dashboard-layout__sidebar-item ${location.pathname.includes(item.path) ? 'dashboard-layout__sidebar-item--active' : ''}`}
              onClick={() => navigate(item.path)}
            >
              <BaseIcon icon={item.icon} width={24} />
              <span>{item.label}</span>
            </div>
          ))}
        </div>

        <div className="dashboard-layout__sidebar-footer">
          <div className="dashboard-layout__sidebar-item" onClick={() => navigate('/logout')}>
            <BaseIcon icon="material-symbols-light:logout" width={24} />
            <span>Logout</span>
          </div>
        </div>
      </div>

      <div className="dashboard-layout__content">
        {children}
      </div>
    </div>
  )
}

export default DashboardLayout

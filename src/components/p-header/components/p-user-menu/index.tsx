import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import BaseIcon from 'src/components/_base/base-icon'
import './styles.scss'
import { useSelector } from 'react-redux'
import { RootState } from 'src/store'

const PUserMenu: React.FC = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)
  const navigate = useNavigate()
  const { userInfo } = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node

      if (dropdownRef.current && !(dropdownRef.current as any)?.contains(target)) {
        setDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen)
  const renderNMenuItems = () => (
    <>
      <div className="p-user-menu-dropdown__nav" onClick={() => navigate('/profile')}>
        <BaseIcon icon="solar:user-outline" width={24} />
        <span>Profile</span>
      </div>
      <div className="p-user-menu-dropdown__nav" onClick={() => navigate('/dashboard')}>
        <BaseIcon icon="material-symbols-light:dashboard-outline-rounded" width={24} />
        <span>Dashboard</span>
      </div>
      <div className="p-user-menu-dropdown__nav" onClick={() => navigate('/my-listings')}>
        <BaseIcon icon="mdi-light:format-list-checks" width={24} />
        <span>Listings</span>
      </div>
      {userInfo?.userType === 'paw-admin' && (
        <div className="p-user-menu-dropdown__nav" onClick={() => navigate('/admin')}>
          <BaseIcon icon="material-symbols:admin-panel-settings-outline" width={24} />
          <span>Admin Dashboard</span>
        </div>
      )}
      <div className="p-user-menu-dropdown__nav" onClick={() => navigate('/logout')}>
        <BaseIcon icon="material-symbols-light:logout" width={24} />
        <span>Logout</span>
      </div>
    </>
  )
  const renderDropdown = () => (
    <div className="p-user-menu-dropdown" ref={dropdownRef}>
      <div className="p-user-menu-dropdown__item">{renderNMenuItems()}</div>
    </div>
  )
  return (
    <div className="p-user-menu">
      <div className="p-user-menu__icon">
        <BaseIcon icon="material-symbols:search" width={32} />
      </div>
      <div className="p-user-menu__icon">
        <BaseIcon icon="material-symbols:favorite-outline" width={32} />
      </div>
      <div className={dropdownOpen ? 'p-user-menu__icon p-user-menu__icon--active' : 'p-user-menu__icon'} onClick={toggleDropdown}>
        {userInfo?.profilePicture ? (
          <img src={userInfo.profilePicture} alt="User" className="w-8 h-8 rounded-full object-cover" />
        ) : (
          <BaseIcon icon="mingcute:user-4-line" width={32} />
        )}
      </div>

      {dropdownOpen && renderDropdown()}
    </div>
  )
}

export default PUserMenu

import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from 'src/store'
import { useNavigate, Link } from 'react-router-dom'

import BaseButton from 'src/components/_base/base-button'
import BaseIcon from 'src/components/_base/base-icon'
import PUserMenu from './components/p-user-menu/index'
import './styles.scss'

const PHeader: React.FC = () => {
  const isMobile = useSelector((state: RootState) => state.isMobile.value)

  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn)
  const isAuthChecking = useSelector((state: RootState) => state.auth.isAuthChecking)

  const [dropdownOpen, setDropdownOpen] = useState(false)
  const navigate = useNavigate()

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen)

  const renderNavLinks = () => (
    <>
      <Link to="/" className="p-header__dropdown-item">
        Home
      </Link>
      <Link to="/pets" className="p-header__dropdown-item">
        Find a Pet
      </Link>
      <Link to="/about" className="p-header__dropdown-item">
        About
      </Link>
    </>
  )

  const renderActions = () => (
    <>
      <BaseButton title="Login" type="default" onClick={() => navigate('/login')} rounded={true} />
      <BaseButton title="Join" type="outline" onClick={() => navigate('/signup')} rounded={true} />
    </>
  )

  const renderMobileIcon = () => (
    <BaseIcon icon={dropdownOpen ? 'material-symbols:close' : 'material-symbols:menu'} width={36} onClick={toggleDropdown} />
  )

  const renderDropdown = () => (
    <div className="p-header__dropdown">
      <div className="p-header__dropdown-items">{renderNavLinks()}</div>
      <div className="p-header__dropdown-actions">{renderActions()}</div>
    </div>
  )

  return (
    <header className="p-header">
      <div className="p-header__container">
        <a href="/" className="p-header__title">
          <img src={require('../../assets/logo.png')} alt="Pawtopia" className="p-header__logo" />
        </a>
        {!isMobile && <div className="p-header__nav">{renderNavLinks()}</div>}
      </div>
      {!isAuthChecking && !isMobile && !isLoggedIn && <div className="p-header__actions">{renderActions()}</div>}
      {!isAuthChecking && isLoggedIn && <PUserMenu />}
      {!isAuthChecking && isMobile && !isLoggedIn && renderMobileIcon()}
      {!isAuthChecking && isMobile && dropdownOpen && !isLoggedIn && renderDropdown()}
    </header>
  )
}

export default PHeader

import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import './styles.scss'

import { useApi } from 'src/api/api-context'
import { checkLoginStatus } from 'src/helpers/auth'
import { showToast } from 'src/utils/toast'
import { RootState } from 'src/store'

import BaseButton from 'src/components/_base/base-button'
import PInput from 'src/components/p-input'

const Login: React.FC = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const api = useApi()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const isMobile = useSelector((state: RootState) => state.isMobile.value)

  async function login() {
    // Validation
    if (!username.trim()) {
      showToast.error('Please enter your username')
      return
    }
    
    if (!password.trim()) {
      showToast.error('Please enter your password')
      return
    }

    if (password.length < 6) {
      showToast.error('Password must be at least 6 characters')
      return
    }

    setIsLoading(true)

    try {
      const { err, res } = await api.auth.login({ username, password })
      
      if (err) {
        const errorMessage = (err as any).response?.data?.message || 'Login failed. Please check your credentials.'
        showToast.error(errorMessage)
        return
      }

      const { token } = res?.data as { token: string }

      localStorage.setItem('token', token)

      await checkLoginStatus(dispatch, api)
      
      showToast.success('Login successful! Welcome back.')
      
      // Navigate after a short delay to show the success message
      setTimeout(() => {
        navigate('/')
      }, 1000)
    } catch (error: any) {
      showToast.error(error.message || 'An unexpected error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="page page__login">
      {!isMobile && (
        <div className="page__login-asset">
          <img src={require('../../assets/login-asset.svg').default} alt="Pawtopia" />
        </div>
      )}

      <div className="form form__login">
        <div className="form__login-title">Login</div>
        <div className="form__login-subtitle">Welcome back! Please login to your account.</div>
        
        <PInput 
          label="Username" 
          value={username} 
          onChange={setUsername} 
          placeholder="Username"
        />
        
        <PInput
          label="Password"
          value={password}
          onChange={setPassword}
          placeholder="Enter Password"
          type={showPassword ? 'text' : 'password'}
          hasHideIcon={true}
        />
        
        <div className="form__forgot-password">
          Don't remember your password?&nbsp;
          <a href="/">Reset Now</a>
        </div>
        
        <div className="form__actions">
          <BaseButton 
            title={isLoading ? 'Logging in...' : 'Login'} 
            type="default" 
            onClick={login}
            disabled={isLoading}
          />
        </div>

        <div className="form__signup-link">
          Don't have an account?&nbsp;
          <Link to="/signup">Sign up here</Link>
        </div>
      </div>
    </div>
  )
}

export default Login

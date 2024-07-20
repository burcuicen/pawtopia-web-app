import { Dispatch } from 'redux'
import { IUser } from 'src/api/interfaces/user'
import { setAuthState } from 'src/store/reducers/authSlice'
import { useApi } from 'src/api/api-context'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'

export const checkLoginStatus = async (dispatch: Dispatch, api: any) => {
  const token = localStorage.getItem('token')

  if (token) {
    try {
      const response = await api.auth.getUserFromToken(token)
      if (response?.res?.data._id) {
        dispatch(setAuthState({ isLoggedIn: true, userInfo: response?.res?.data as IUser }))
      }
    } catch (error) {
      dispatch(setAuthState({ isLoggedIn: false, userInfo: null }))
    }
  } else {
    dispatch(setAuthState({ isLoggedIn: false, userInfo: null }))
  }
}

// Hook
export const useCheckLoginStatus = () => {
  const dispatch = useDispatch()
  const api = useApi()

  useEffect(() => {
    // Utilize the standalone function within the hook
    checkLoginStatus(dispatch, api)

    const intervalId = setInterval(() => checkLoginStatus(dispatch, api), 300000)

    return () => clearInterval(intervalId)
  }, [dispatch, api])
}

import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

import type { IUser } from 'src/api/interfaces/user';

import { setAuthState } from 'src/store/reducers/authSlice';

import { useApi } from 'src/api/api-context';

export const useCheckLoginStatus = () => {
    const dispatch = useDispatch();
    const api = useApi();
  
    useEffect(() => {
      const checkLoginStatus = async () => {
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWFiZjhmMTY4ZTEzNGZmNWE3NmE3NzUiLCJpYXQiOjE3MDgxMDcxNTgsImV4cCI6MTcwODE5MzU1OH0.0rAef42cJL5b0K6Xsr79O9KA9BivhvjwprpK_GL_PKE'

        if (token) {
          try {
            const response = await api.auth.getUserFromToken(token);
            dispatch(setAuthState({ isLoggedIn: true, userInfo: response?.res?.data as IUser }));
          } catch (error) {
            dispatch(setAuthState({ isLoggedIn: false, userInfo: null }));
          }
        } else {
          dispatch(setAuthState({ isLoggedIn: false, userInfo: null }));
        }
      };
  
      checkLoginStatus();
  
      const intervalId = setInterval(checkLoginStatus, 300000);
  
      return () => clearInterval(intervalId);
    }, [dispatch, api]);
  };
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setAuthState } from 'src/store/reducers/authSlice';

const Logout: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.removeItem('token');

        dispatch(setAuthState({ isLoggedIn: false, userInfo: null }));

        navigate('/');
    }, [dispatch, navigate]);

    return (
        <div className="logout">
            Logging out...
        </div>
    );
};

export default Logout;

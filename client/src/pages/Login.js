import React, { useEffect } from 'react';
import LoginForm from '../components/LoginForm/LoginForm';
import { useHistory } from 'react-router-dom';
import checkAuthorization from '../utils/checkAuthorization';

function Login() {
    const routerHistory = useHistory();

    useEffect(() => {
        checkAuthorization(false, routerHistory);
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <LoginForm />
    )
}

export default Login

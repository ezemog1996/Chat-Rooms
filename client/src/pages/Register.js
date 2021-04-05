import React, { useEffect } from 'react';
import RegisterForm from '../components/RegisterForm/RegisterForm';
import { useHistory } from 'react-router-dom';
import checkAuthorization from '../utils/checkAuthorization';

function Register() {
    const routerHistory = useHistory();

    useEffect(() => {
        checkAuthorization(false, routerHistory);
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <RegisterForm />
    )
}

export default Register

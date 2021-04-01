import React, { useState } from 'react'
import './style.css';
import handleInputChangeState from '../../utils/Functions/handleInputChangeState';
import handleFormSubmit from '../../utils/Functions/handleFormSubmit';

function LoginForm() {
    const [userInfo, setUserInfo] = useState({})
    const inputs = [
        {
            type: 'username',
            label: 'Username',
        },
        {
            type: 'password',
            label: 'Password'
        }
    ]

    const handleInputChange = e => {
        handleInputChangeState(e, userInfo, setUserInfo)
    }

    const submitForm = e => {console.log(userInfo)
        e.preventDefault();
        handleFormSubmit(userInfo, 'login');
    }

    return (
        <form className="login-form" onSubmit={submitForm}>
            <h2>Login</h2>
            {
                inputs.map((input, index) => (
                    <div key={index} className="input-container">
                        <label>{input.label}</label>
                        <br/>
                        <input className="typed-input" onChange={handleInputChange} name={input.type} type={input.type} />
                    </div>
                ))
            }
            <button className="submit-btn" type="submit">Sign in</button>
        </form>
    )
}

export default LoginForm

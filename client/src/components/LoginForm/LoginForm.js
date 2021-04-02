import React, { useState, useContext } from 'react'
import './style.css';
import handleInputChangeState from '../../utils/Functions/handleInputChangeState';
import handleFormSubmit from '../../utils/Functions/handleFormSubmit';
import { useHistory } from 'react-router-dom';
import readyToSubmit from '../../utils/Functions/readyToSubmit';
import UserContext from '../../utils/UserContext';

function LoginForm() {
    const routerHistory = useHistory();
    const { changeUser } = useContext(UserContext);
    const [userInfo, setUserInfo] = useState({});
    const [loginMessage, setLoginMessage] = useState('');
    const [loginMessageColor, setLoginMessageColor] = useState('');
    const [missingFieldsMessage, setMissingFieldsMessage] = useState(() => {
        return;
    });
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
        handleInputChangeState(e, userInfo, setUserInfo);
    }

    const submitForm = e => {console.log(userInfo)
        e.preventDefault();

        setLoginMessage("");

        const textInputs = document.querySelectorAll('.typed-input');
        const textInputLabels = document.querySelectorAll('.typed-input-label');

        const readyToLogin = readyToSubmit(textInputs, textInputLabels, setMissingFieldsMessage);

        if (readyToLogin) {
            handleFormSubmit(userInfo, 'login')
                .then(res => {
                    setMissingFieldsMessage(() => {
                        return
                    })
                    setLoginMessage(res.data.message)
                    if (res.data.message === "You've been successfully logged in!") {
                        document.querySelectorAll('input').forEach(input => input.value = '');
                        setLoginMessageColor('green')
                        changeUser(res.data.username, res.data.profilePic, res.data.chats);
                        routerHistory.push('/dashboard')
                    } else {
                        setLoginMessageColor('red')
                    }
                })
                .catch(err => console.log(err));
        }
    }

    return (
        <form className="login-form" onSubmit={submitForm}>
            <h2>Login</h2>
            {
                inputs.map((input, index) => (
                    <div key={index} className="input-container">
                        <label className="typed-input-label">{input.label}</label>
                        <br/>
                        <input className="typed-input" onChange={handleInputChange} name={input.type} type={input.type} />
                    </div>
                ))
            }
            <div style={{color: loginMessageColor}}>{loginMessage}</div>
            <button className="submit-btn" type="submit">Sign in</button>
            {
                missingFieldsMessage
            }
        </form>
    )
}

export default LoginForm

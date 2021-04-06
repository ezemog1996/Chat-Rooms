import React from 'react';
import './style.css';
import API from '../../utils/API';

function Profile({ profilePic, username, changeUser }) {

    const signOut = e => {
        e.preventDefault();
        API.logout()
            .then(res => {
                changeUser('', '', '', [], []);
                window.location.replace('/');
            });
    }

    return (
        <div className='chosen-container' style={{padding: '5px'}}>
            <div className="image-option" style={{height: '150px', width: '150px', margin: 'auto'}}>
                <img src={profilePic} style={{height: '100%'}} alt="preview of profile" />
            </div>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <h1>{username}</h1>
            </div>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <button onClick={signOut}>Sign Out</button>
            </div>
        </div>
    )
}

export default Profile

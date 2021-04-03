import React, { useContext, useState, useEffect } from 'react';
import UserContext from '../../utils/UserContext';
import './style.css';
import Profile from '../Profile/Profile';
import Conversations from '../Conversations/Conversations';
import Friends from '../Friends/Friends';

function Sidebar() {
    const choices = {
        profile: Profile,
        conversations: Conversations,
        friends: Friends
    }

    const { username, profilePic, chats, changeUser } = useContext(UserContext);
    const [chosen, setChosen] = useState();

    useEffect(() => {
        setChosen(choices.conversations)
    }, [])

    const changeChosen = e => {
        const { name } = e.target;

        setChosen(choices[name])
        
        document.querySelectorAll('.tab').forEach(tab => {
            tab.style.backgroundColor = 'cornflowerblue';
        })

        document.getElementsByName(name).forEach(item => {
            item.style.backgroundColor = 'lightgrey';
        })
    }

    return (
        <div>
            <nav className="options-container">
                <button className="option tab" name="profile" onClick={changeChosen}>
                    <div className="image-option tab" >
                        <img src={profilePic} name="profile" style={{height: '100%'}} alt="preview of profile" />
                    </div>
                </button>
                <button className="option tab" name="conversations" onClick={changeChosen} style={{backgroundColor: "lightgrey"}}>
                    <a className="fas fa-comment-dots fa-4x tab" name="conversations"></a>
                </button>
                <button className="option tab" name="friends" onClick={changeChosen}>
                    <a className="fas fa-users fa-4x tab" name="friends"></a>
                </button>
            </nav>
            <div>
                {chosen}
            </div>
        </div>
    )
}

export default Sidebar

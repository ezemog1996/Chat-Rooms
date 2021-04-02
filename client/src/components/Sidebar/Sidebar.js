import React, { useContext, useState, useEffect } from 'react';
import UserContext from '../../utils/UserContext';
import './style.css';

function Sidebar() {

    const { username, profilePic, chats, changeUser } = useContext(UserContext);
    const [chosenOption, setChosenOption] = useState(() => {})

    useEffect(() => {
        setChosenOption(options.profile);
    }, [])

    const options = {
        'profile': () => {
            return (
                <div>
                    profile
                </div>
            )
        },
        'conversations': () => {
            return (
                <div>
                    conversations
                </div>
            )
        },
        'friends': () => {
            return (
                <div>
                    friends
                </div>
            )
        }
    }

    return (
        <nav>
            <div className="options-container">
                <div className="option">
                    <div className="image-option" >
                        <img src={profilePic} style={{height: '100%'}} alt="preview of profile" />
                    </div>
                </div>
                <div className="option">
                        Conversations
                </div>
            </div>
            <div className="chosen-container">
                {chosenOption}
            </div>
        </nav>
    )
}

export default Sidebar

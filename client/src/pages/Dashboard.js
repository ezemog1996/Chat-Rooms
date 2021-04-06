import React, { useState, useEffect, useContext, useRef } from 'react';
import checkAuthorization from '../utils/checkAuthorization';
import { useHistory } from 'react-router-dom';
import UserContext from '../utils/UserContext';
import Sidebar from '../components/Sidebar/Sidebar';
import ChatContext from '../utils/ChatContext';
import handleFormSubmit from '../utils/Functions/handleFormSubmit';

function Dashboard() {
    const { username, profilePic, chats, friends} = useContext(UserContext);
    const routerHistory = useHistory();

    const [chatSection, setChatSection] = useState(() => {});

    const messageRef = useRef();

    const [chat, setChat] = useState({
        _id: '',
        roomName: '',
        messages: [],
        participants: [],
        changeChat: (_id, roomName, messages, participants) => {
            setChat({ ...chat, _id, roomName, messages, participants})
        }
    })
    useEffect(() => {
        checkAuthorization(true, routerHistory);
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (chat.participants.length) {
            setChatSection(() => {
                return (
                    <div>
                        <div style={{borderBottom: '1px solid lightgrey'}}>
                            <h4 style={{margin: 0, padding: 2}}>
                                {chat.roomName} Members:  
                                {
                                    chat.participants.map(participant => (
                                        participant.username === username
                                        ?
                                            ' You,'
                                        :
                                            chat.participants.indexOf(participant) === chat.participants.length - 1
                                            ?
                                            ` ${participant.username}`
                                            :
                                            ` ${participant.username},`
                                    ))
                                }
                            </h4>
                        </div>
                        <div>
                            {
                                chat.messages.map(message => (
                                        <div key={message._id} style={{float: 'right'}}>
                                            <div id={message.sender._id}>
                                                {message.sender.username === username ? 'You' : message.sender.username}
                                            </div>
                                            <div>{message.message}</div>
                                            <small>{message.sentOn}</small>
                                        </div>
                                ))
                            }
                        </div>
                        <textarea ref={messageRef} style={{position: 'fixed', bottom: 40, width: '100%', height: '100px', borderRadius: '7.5px', outline: 'none'}} />
                        <button onClick={sendMessage} className="friend-action-btn add-friend" style={{position: 'fixed', bottom: 0, right: 0, padding: '10px'}}>Send</button>
                    </div>
                )
            })
        }
    }, [chat])

    const sendMessage = e => {
        e.preventDefault();
        handleFormSubmit(chat, 'createChat')
            .then(res => {
                console.log(res.data)
            })
    }

    return (
        <ChatContext.Provider value={chat} >
            <div>
                <Sidebar />
                {
                    chatSection
                }
            </div>
        </ChatContext.Provider>
    )
}

export default Dashboard

import React, { useState, useEffect, useContext, useRef } from 'react';
import checkAuthorization from '../utils/checkAuthorization';
import { useHistory } from 'react-router-dom';
import UserContext from '../utils/UserContext';
import Sidebar from '../components/Sidebar/Sidebar';
import ChatContext from '../utils/ChatContext';
import handleFormSubmit from '../utils/Functions/handleFormSubmit';

function Dashboard() {

    const { _id, username, profilePic, chats, friends} = useContext(UserContext);
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
                        <div style={{overflow: 'auto'}}>
                            {
                                chat.messages.map(message => (
                                        <div key={message._id} style={{float: message.sender.username === username ? 'right' : 'left', clear: 'both'}}>
                                            <div id={message.sender._id}>
                                                {message.sender.username === username ? 'You' : message.sender.username}
                                            </div>
                                            <div>{message.message}</div>
                                            <small>{message.sentOn}</small>
                                        </div>
                                ))
                            }
                        </div>
                        <textarea ref={messageRef} style={{position: 'fixed', bottom: 40, width: '50%', height: '100px', borderRadius: '7.5px', outline: 'none'}} />
                        <button onClick={sendMessage} className="friend-action-btn add-friend" style={{position: 'fixed', bottom: 0, right: 0, padding: '10px'}}>Send</button>
                    </div>
                )
            })
        }
    }, [chat])

    const sendMessage = e => {
        e.preventDefault();
        let roomId;
        if (messageRef.current.value.length) {
            if (!chat._id) {
                handleFormSubmit(chat, 'createChat')
                .then(res => {
                    chat.changeChat(res.data._id, res.data.roomName, [], res.data.participants);
                    roomId = res.data._id;
                    handleFormSubmit({
                        roomId: res.data._id,
                        sender: {
                            username,
                            _id
                        },
                        message: messageRef.current.value
                    }, 'sendMessage')
                        .then(response => {
                            console.log(response);
                            chat.changeChat(chat._id, chat.roomName, [response.data, ...chat.messages], chat.participants)
                        })
                })
            } else {
                roomId = chat._id
                handleFormSubmit({
                    roomId: chat._id,
                    sender: {
                        username,
                        _id
                    },
                    message: messageRef.current.value
                }, 'sendMessage')
                    .then(response => chat.changeChat(chat._id, chat.roomName, [response.data, ...chat.messages], chat.participants))
            }

            const message = {
                roomId,
                sender: {
                    username,
                    _id
                },
                message: messageRef.current.value
            }
        }
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

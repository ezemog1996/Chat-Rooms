import React, { useState, useContext, useRef } from 'react';
import UserContext from '../../utils/UserContext';
import ChatContext from '../../utils/ChatContext';
import SocketContext from '../../utils/SocketContext';
import handleFormSubmit from '../../utils/Functions/handleFormSubmit';

function Chat() {
    const user = useContext(UserContext);
    const socket = useContext(SocketContext);
    const { chat, setChat } = useContext(ChatContext);

    const messageRef = useRef();

    const sendMessage = e => {
        e.preventDefault();
        let roomId;
        if (messageRef.current.value.length) {
            if (!chat._id) {
                handleFormSubmit(chat, 'createChat')
                    .then(res => {
                        roomId = res.data._id;
                        handleFormSubmit({
                            roomId,
                            sender: {
                                username: user.username,
                                _id: user._id
                            },
                            message: messageRef.current.value
                        }, 'sendMessage')
                            .then(response => {
                                setChat({
                                    _id: res.data._id,
                                    roomName: res.data.roomName,
                                    messages: [...chat.messages, response.data],
                                    participants: res.data.participants
                                })

                                socket.emit('message', {
                                    participants: chat.participants,
                                    roomName: res.data.roomName,
                                    message: {
                                        roomId,
                                        sender: {
                                            _id: user._id,
                                            username: user.username
                                        },
                                        message: messageRef.current.value
                                    }
                                })

                            })
                    })
            } else {
                roomId = chat._id;
                handleFormSubmit({
                    roomId: chat._id,
                    sender: {
                        username: user.username,
                        _id: user._id
                    },
                    message: messageRef.current.value
                }, 'sendMessage')
                    .then(response => {
                        setChat({ ...chat, messages: [...chat.messages, response.data] })

                        socket.emit('message', {
                            participants: chat.participants,
                            roomName: chat.roomName,
                            message: {
                                roomId,
                                sender: {
                                    _id: user._id,
                                    username: user.username
                                },
                                message: messageRef.current.value
                            }
                        })
                    })
            }

            const message = {
                roomId,
                sender: {
                    username: user.username,
                    _id: user._id
                },
                message: messageRef.current.value
            }
        }
    }

    return (
        chat.participants.length
        ?
        <div>
            <div style={{borderBottom: '1px solid lightgrey'}}>
                <h4 style={{margin: 0, padding: 2}}>
                    {chat.roomName} Members:  
                    {
                        chat.participants.map(participant => (
                            participant.username === user.username
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
            <div style={{overflow: 'auto',}}>
                {
                    chat.messages.map(message => (
                            <div key={message._id} style={{float: message.sender.username === user.username ? 'right' : 'left', clear: 'both'}}>
                                <div id={message.sender._id}>
                                    {message.sender.username === user.username ? 'You' : message.sender.username}
                                </div>
                                <div>{message.message}</div>
                                <small>{message.sentOn}</small>
                            </div>
                    ))
                }
            </div>
            <textarea ref={messageRef} className="text-area" style={{position: 'fixed', bottom: 40, height: '100px', borderRadius: '7.5px', outline: 'none'}} />
            <button onClick={sendMessage} className="friend-action-btn add-friend" style={{position: 'fixed', bottom: 0, right: 0, padding: '10px'}}>Send</button>
        </div>
        :
        <div></div>
    )
}

export default Chat

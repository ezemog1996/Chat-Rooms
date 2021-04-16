import React, { useState, useContext, useEffect, useRef } from 'react';
import UserContext from '../../utils/UserContext';
import ChatContext from '../../utils/ChatContext';
import handleFormSubmit from '../../utils/Functions/handleFormSubmit';
import io from 'socket.io-client';

function Chat() {
    const user = useContext(UserContext);
    const { chat, setChat } = useContext(ChatContext);
    const [socket, setSocket] = useState()

    const messageRef = useRef();

    useEffect(() => {
        const newSocket = io('localhost:3000', { query: { id: user._id } });
        setSocket(newSocket);
        newSocket.on('message', message => {
            console.log(message);
        })
    }, [user])

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

                            const recipients = chat.participants.filter(participant => participant._id !== user._id);
                            socket.emit('message', { participants: recipients, message: "I'm sending this message" })

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

                        const recipients = chat.participants.filter(participant => participant._id !== user._id);
                        socket.emit('message', { participants: recipients, message: "I'm sending another message" })
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

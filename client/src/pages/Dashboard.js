import React, { useState, useEffect, useContext } from 'react';
import checkAuthorization from '../utils/checkAuthorization';
import { useHistory } from 'react-router-dom';
import Sidebar from '../components/Sidebar/Sidebar';
import UserContext from '../utils/UserContext';
import ChatContext from '../utils/ChatContext';
import SocketContext from '../utils/SocketContext';
import Chat from '../components/Chat/Chat';
import io from 'socket.io-client';
import API from '../utils/API';

function Dashboard() {
    
    const routerHistory = useHistory();
    const { _id, username, profilePic, chats, friends } = useContext(UserContext);
    const [socket, setSocket] = useState();

    const [chat, setChat] = useState({
        _id: '',
        roomName: '',
        messages: [],
        participants: [],
    })

    useEffect(() => {
        checkAuthorization(true, routerHistory);
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        const newSocket = io('localhost:3000', { query: { id: _id } });
        setSocket(newSocket);
        newSocket.on('message', message => {
            if (chat._id === message.roomId) {
                setChat({
                    ...chat,
                    messages: [...chat.messages, message]
                })
            } else {
                console.log(message)
                API.addRoomToUser({
                    _id: message.message.roomId,
                    roomName: message.roomName,
                    members: message.participants
                })
                    .then(res => console.log(res))
                    .catch(err => console.log(err));
            }
        })
    }, [_id])

    return (
        <SocketContext.Provider value={socket}>
            <ChatContext.Provider value={{chat, setChat}} >
                <Sidebar />
                <Chat />
            </ChatContext.Provider>
        </SocketContext.Provider>
    )
}

export default Dashboard

import React, { useState, useEffect } from 'react';
import checkAuthorization from '../utils/checkAuthorization';
import { useHistory } from 'react-router-dom';
import Sidebar from '../components/Sidebar/Sidebar';
import ChatContext from '../utils/ChatContext';
import Chat from '../components/Chat/Chat';

function Dashboard() {
    
    const routerHistory = useHistory();

    const [chat, setChat] = useState({
        _id: '',
        roomName: '',
        messages: [],
        participants: [],
    })

    useEffect(() => {
        checkAuthorization(true, routerHistory);
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <ChatContext.Provider value={{chat, setChat}} >
            <div>
                <Sidebar />
                <Chat />
            </div>
        </ChatContext.Provider>
    )
}

export default Dashboard

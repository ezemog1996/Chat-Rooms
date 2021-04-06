import React from 'react';

const ChatContext = React.createContext({
    _id: '',
    roomName: '',
    messages: [],
    participants: [],
    changeChat: () => {}
})

export default ChatContext;
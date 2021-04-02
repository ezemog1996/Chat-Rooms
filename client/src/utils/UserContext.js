import React from 'react';

const UserContext = React.createContext({
    username: '',
    profilePic: '',
    chats: [],
    changeUser: () => {}
})

export default UserContext;
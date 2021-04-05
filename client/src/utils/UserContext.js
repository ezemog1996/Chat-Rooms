import React from 'react';

const UserContext = React.createContext({
    username: '',
    profilePic: '',
    chats: [],
    friends: [],
    changeUser: () => {}
})

export default UserContext;
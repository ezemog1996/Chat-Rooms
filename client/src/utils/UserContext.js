import React from 'react';

const UserContext = React.createContext({
    _id: '',
    username: '',
    profilePic: '',
    chats: [],
    friends: [],
    changeUser: () => {}
})

export default UserContext;
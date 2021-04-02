import React, { useEffect, useContext } from 'react';
import checkAuthorization from '../utils/checkAuthorization';
import { useHistory } from 'react-router-dom';
import UserContext from '../utils/UserContext';
import Sidebar from '../components/Sidebar/Sidebar';

function Dashboard() {
    const { username, profilePic, chats} = useContext(UserContext);
    const routerHistory = useHistory();

    useEffect(() => {
        checkAuthorization(true, routerHistory);
    }, []) // eslint-disable-line react-hooks/exhaustive-deps
    return (
        <div>
            <Sidebar />
        </div>
    )
}

export default Dashboard

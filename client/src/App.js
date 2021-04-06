import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import API from './utils/API';
import UserContext from './utils/UserContext';

function App() {
  const [user, setUser] = useState({
    _id: '',
    username: '',
    profilePic: '',
    chats: [],
    friends: [],
    changeUser: (_id, username, profilePic, chats, friends) => {
      setUser({...user, _id, username, profilePic, chats, friends})
    }
  });

  useEffect(() => {
    API.findUser()
      .then(res => {
          setUser({
            ...user,
            _id: res.data._id,
            username: res.data.username,
            profilePic: res.data.profilePic,
            chats: res.data.chats,
            friends: res.data.friends
          })
      })
      .catch(err => console.log(err))
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <UserContext.Provider value={user}>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/dashboard" exact component={Dashboard} />
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
        </Switch>
        
      </Router>
    </UserContext.Provider>
  );
}

export default App;

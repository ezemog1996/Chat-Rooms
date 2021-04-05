import React, { useContext } from 'react';
import './style.css';
import handleFormSubmit from '../../utils/Functions/handleFormSubmit';
import UserContext from '../../utils/UserContext';

function FriendDiv({ friends }) {
    const user = useContext(UserContext);

    const addFriend = e => {
        e.preventDefault();
        if (e.target.getAttribute('data-id')) {
            handleFormSubmit({
                username: e.target.name,
                _id: e.target.getAttribute('data-id')
            }, 'addFriend')
                .then(res => {
                    user.friends.push({
                        username: e.target.name,
                        _id: e.target.getAttribute('data-id')
                    })
                    e.target.textContent = 'Just Added';
                    document.getElementById(`view${e.target.getAttribute('data-id')}`).style.display = 'none';
                    e.target.removeAttribute('data-id');
                })
        }
    }

    const handleSendMessageClick = e => {
        e.preventDefault();

        console.log('sending message')
    }
    return (
        friends.length ?
        friends.map((friend, index) => (
            user.friends.some(item => item._id === friend._id) ?
            <div key={index} id={friend._id} style={{borderBottom: '1px solid grey', padding: '5px'}}>
                <p style={{padding: 0, margin: 0}}>{friend.username} <button className='friend-action-btn' style={{float: 'right', marginRight: '2px', backgroundColor: 'green', color: 'white'}}>Already Friends</button></p>
            </div>
            :
            <div key={index} id={friend._id} style={{borderBottom: '1px solid grey', padding: '5px'}}>
                <p style={{padding: 0, margin: 0}}>{friend.username} <button style={{float: 'right', marginX: '2px'}} className='friend-action-btn add-friend' data-id={friend._id} name={friend.username} onClick={addFriend}>Add</button> <button name={friend.username} data-id={friend._id} id={`view${friend._id}`} className='friend-action-btn' style={{float: 'right', marginRight: '2px'}}>View</button></p>
            </div>
        ))
        :
        user.friends.map((friend, index) => (
            <div key={index} id={friend._id} style={{borderBottom: '1px solid grey', padding: '5px'}}>
                <p style={{padding: 0, margin: 0}}>{friend.username} <button onClick={handleSendMessageClick} className='friend-action-btn add-friend' style={{float: 'right', marginRight: '2px'}} data-id={friend._id}>Send Message</button></p>
            </div>
        ))
    )
}

export default FriendDiv

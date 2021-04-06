import React, { useState, useContext } from 'react';
import './style.css';
import handleFormSubmit from '../../utils/Functions/handleFormSubmit';
import UserContext from '../../utils/UserContext';
import ChatContext from '../../utils/ChatContext';

function FriendDiv({ friends }) {
    const user = useContext(UserContext);
    const { changeChat } = useContext(ChatContext);

    const addFriend = e => {
        e.preventDefault();
        if (e.target.textContent === 'Add') {
            handleFormSubmit({
                username: e.target.name,
                _id: e.target.getAttribute('data-id')
            }, 'addFriend')
                .then(res => {
                    user.friends.push({
                        username: e.target.name,
                        _id: e.target.getAttribute('data-id')
                    })
                    e.target.textContent = 'Message';
                    document.getElementById(`view${e.target.getAttribute('data-id')}`).style.display = 'none';
                    e.target.addEventListener('click', handleSendMessageClick);
                })
        }
    }

    const handleSendMessageClick = e => {
        e.preventDefault();
        changeChat('', '', [], [
            {
                _id: user._id,
                username: user.username
            },
            {
                _id: e.target.getAttribute('data-id'),
                username: e.target.parentNode.textContent.split(' ')[0]
            }
        ]);
    }
    return (
        friends.length ?
        friends.map((friend, index) => (
            user.friends.some(item => item._id === friend._id) ?
            <div key={index} id={friend._id} style={{borderBottom: '1px solid grey', padding: '5px'}}>
                <p style={{padding: 0, margin: 0}}>{friend.username} <button onClick={handleSendMessageClick} className='friend-action-btn add-friend' style={{float: 'right', marginRight: '2px'}} data-id={friend._id}>Message</button></p>
            </div>
            :
            <div key={index} id={friend._id} style={{borderBottom: '1px solid grey', padding: '5px'}}>
                <p style={{padding: 0, margin: 0}}>{friend.username} <button style={{float: 'right', marginX: '2px'}} className='friend-action-btn add-friend' data-id={friend._id} name={friend.username} onClick={addFriend}>Add</button> <button name={friend.username} data-id={friend._id} id={`view${friend._id}`} className='friend-action-btn' style={{float: 'right', marginRight: '2px'}}>View</button></p>
            </div>
        ))
        :
        user.friends.map((friend, index) => (
            <div key={index} id={friend._id} style={{borderBottom: '1px solid grey', padding: '5px'}}>
                <p style={{padding: 0, margin: 0}}>{friend.username} <button onClick={handleSendMessageClick} className='friend-action-btn add-friend' style={{float: 'right', marginRight: '2px'}} data-id={friend._id}>Message</button></p>
            </div>
        ))
    )
}

export default FriendDiv

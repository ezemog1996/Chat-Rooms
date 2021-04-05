import React from 'react'

function Conversations({ chats }) {
    return (
        <div className='chosen-container'>
            {
                chats.map(chat => (
                    <div key={chat.id} style={{borderBottom: '1px solid grey'}}>
                        <h6>{chat.roomName}</h6>
                        <small>
                            {chat.members.map(member => {
                                if (chat.members.findIndex(member) !== chat.members.length - 1) {
                                    return <span key={member.id}>{member}, </span>
                                } else {
                                    return <span key={member.id}>{member}</span>
                                }

                            })}
                        </small>
                    </div>
                ))
            }
        </div>
    )
}

export default Conversations

import React, { useEffect, useState } from 'react';
import './style.css';
import API from '../../utils/API';
import useDebounce from '../../utils/Functions/Hooks/useDebounce';
import handleInputChangeState from '../../utils/Functions/handleInputChangeState';
import FriendDiv from '../FriendDiv/FriendDiv';

function Friends({ friends }) {
    const searchMethods = {
        yourFriends: {
            placeholder: 'Search your friends list',
            method: search => {
                friends.filter(friend => friend.username.includes(search))
            }
        },
        findFriends: {
            placeholder: 'Search for friends to add',
            method: search => {
                API.findFriends(search)
                    .then(res => {
                        setSearchResults(res.data);
                    })
            }
        }
    }

    const [searchMethod, setSearchMethod] = useState({...searchMethods.yourFriends});
    const [search, setSearch] = useState({
        username: ''        
    });
    const [searchResults, setSearchResults] = useState([]);
    const debouncedSearch = useDebounce(search.username, 500)

    useEffect(() => {
        setSearchMethod({
            ...searchMethod,
            ...searchMethods.yourFriends
        })
    }, [])

    useEffect(() => {
        if (search.username) searchMethod.method(debouncedSearch);
    }, [debouncedSearch])

    const switchAction = e => {
        document.querySelectorAll('.friend-btn').forEach(btn => {
            btn.style.color = 'lightgrey'
        })

        e.target.style.color = 'white';

        const { name } = e.target;

        setSearchMethod({
            ...searchMethod,
            ...searchMethods[name]
        })

        setSearchResults([]);
    }

    const handleInputChange = e => {
        handleInputChangeState(e, search.username, setSearch)
    }
    return (
        <div className='chosen-container'>
            <div>
                <div style={{paddingRight: '5px', paddingLeft: '5px', backgroundColor: 'grey'}}>
                    <button name='findFriends' className='friend-btn add-friend-btn' onClick={switchAction}>Add Friend</button>
                    <button name='yourFriends' className='friend-btn your-friends-btn' onClick={switchAction}>Your Friends</button>
                    <input onChange={handleInputChange} name='username' className='search-friend' placeholder={searchMethod.placeholder} />
                </div>
            </div>
            <div>
                <FriendDiv friends={searchResults} />
            </div>
        </div>
    )
}

export default Friends

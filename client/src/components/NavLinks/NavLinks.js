import React, { useState, useContext, useEffect } from 'react';
import './style.css';
import UserContext from '../../utils/UserContext';
import { useLocation } from 'react-router-dom';

function NavLinks() {
    const location = useLocation();
    const allLinks = [
        {
            protected: true,
            text: "Dashboard",
            route: '/dashboard',
            id: 'dashboard'
        },
        {
            protected: false,
            text: "Sign Up",
            route: "/register",
            id: 'register'
        },
        {
            protected: false,
            text: "Sign In",
            route: '/login',
            id: 'login'
        }
    ]
    const { username } = useContext(UserContext);
    const [links, setLinks] = useState([]);

    useEffect(() => {
        links.forEach(link => {
            if (link.route === location.pathname) {
                document.getElementById(link.id).style.backgroundColor = 'lightgrey'
            }
        })
    })

    useEffect(() => {
        if (username) {
            setLinks(allLinks.filter(link => link.protected))
        } else {
            setLinks(allLinks.filter(link => !link.protected))
        }
    }, [username]) // eslint-disable-line react-hooks/exhaustive-deps
    
    return (
        links.map((link, index) => (
            <a key={index} id={link.id} className="navlink" href={link.route}>{link.text}</a>
        ))
    )
}

export default NavLinks

import React, { useState, useContext, useEffect } from 'react';
import './style.css';
import UserContext from '../../utils/UserContext';

function NavLinks() {
    const allLinks = [
        {
            protected: true,
            text: "Dashboard",
            route: '/dashboard'
        },
        {
            protected: false,
            text: "Sign Up",
            route: "/register"
        },
        {
            protected: false,
            text: "Sign In",
            route: '/login'
        }
    ]
    const { username } = useContext(UserContext);
    const [links, setLinks] = useState([])

    useEffect(() => {
        if (username) {
            setLinks(allLinks.filter(link => link.protected))
        } else {
            setLinks(allLinks.filter(link => !link.protected))
        }
    }, [username]) // eslint-disable-line react-hooks/exhaustive-deps
    return (
        links.map((link, index) => (
            <a key={index} className="navlink" href={link.route}>{link.text}</a>
        ))
    )
}

export default NavLinks

import React, { useState } from 'react';
import './style.css';

function NavLinks() {
    const [links, setLinks] = useState([
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
    ])
    return (
        links.map((link, index) => (
            <a key={index} className="navlink" href={link.route}>{link.text}</a>
        ))
    )
}

export default NavLinks

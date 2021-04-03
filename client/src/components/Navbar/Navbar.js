import React from 'react';
import './style.css';
import NavLinks from '../NavLinks/NavLinks';

function Navbar() {
    return (
        <nav className="navbar" style={{backgroundColor: "cornflowerblue", padding: '10px 10px 15px 10px'}}>
            <a className="navbrand" style={{textDecoration: 'none', color: 'black'}} href="/">G&G Connects</a>
            <div className="navlink-container">
                <NavLinks />
            </div>
        </nav>
    )
}

export default Navbar

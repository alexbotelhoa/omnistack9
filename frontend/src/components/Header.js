import React from 'react';

import './Header.css';
import logo from '../assets/logo.svg'

export default function Header() {
    return (
        <header className="header">
            <img src={logo} alt="Aircnc" />
        </header>
    )
}

import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../klogo';
import './Header.css';

const Header = () => (
    <header className="App-header">
        <Link to="/">
            <Logo />
        </Link>
        <div className="App-links">
            <Link className="App-link" to="/">
                <h2 className="App-title">Home</h2>
            </Link>
            <Link className="App-link" to="/add-user">
                <h2 className="App-title">Add New User</h2>
            </Link>
        </div>
    </header>
);

export default Header;
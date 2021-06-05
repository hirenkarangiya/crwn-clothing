import React from 'react';
import { Link } from 'react-router-dom';

import './header.style.scss';
import { ReactComponent as Logo } from '../../assets/crown.svg';

const Header = () => {
    return (
        <div className="container">
            <header className="header">
                <Link to="/" className="logo-container">
                    <Logo className="logo"/>
                </Link>

                <nav>
                    <ul className="navigation">
                        <li className="navigation-item">
                            <Link to="/shop">
                                Shop
                            </Link>
                        </li>
                        <li className="navigation-item">
                            <Link to="/shop">
                                Contact
                            </Link>
                        </li>
                    </ul>
                </nav>
            </header>
        </div>
    )
}

export default Header;
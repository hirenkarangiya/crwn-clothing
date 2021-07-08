import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { auth } from "../../firebase/firebase.utils";

import "./header.style.scss";
import { ReactComponent as Logo } from "../../assets/crown.svg";

import CartIcon from "../cart-icon/cart-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";

const Header = ({ currentUser, hidden }) => {
  return (
    <div className="container">
      <header className="header">
        <Link to="/" className="logo-container">
          <Logo className="logo" />
        </Link>

        <nav>
          <ul className="navigation">
            <li className="navigation-item">
              <Link to="/shop">Shop</Link>
            </li>
            <li className="navigation-item">
              <Link to="/shop">Contact</Link>
            </li>
            <li className="navigation-item">
              {currentUser ? (
                <div onClick={() => auth.signOut()}>Sign Out</div>
              ) : (
                <Link to="/signin">Sign In</Link>
              )}
            </li>
            {currentUser ? (
              <li className="navigation-item">
                {`Hello, ${currentUser.displayName}`}
              </li>
            ) : null}
            <li>
              <CartIcon />
              {hidden ? null : (
                <ul className="navigation-submenu">
                  <li>
                    <CartDropdown />
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
};

const mapStatetoProps = ({ user: { currentUser }, cart: { hidden } }) => ({
  currentUser,
  hidden,
});

export default connect(mapStatetoProps)(Header);

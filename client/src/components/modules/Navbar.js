import React from "react";

import { NavLink } from "react-router-dom";

// firebase auth
import { auth } from "../../../../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

// styles
import "../../styles/navbar.css";

import logo from "../../../dist/logo.png";

const Navbar = () => {
  const [user, loading] = useAuthState(auth);

  return (
    <>
      <nav className="navbar">
        <div className="logo">
          <NavLink to="/" className="logo--link">
            Tempus
          </NavLink>
        </div>
        <div className="nav-elements">
          <ul>
            <li>
              <NavLink to="/schedule">Schedule</NavLink>
            </li>
            <li>
              <NavLink to="/contact">Contact</NavLink>
            </li>
            <li>
              <NavLink to="/classsetup">New Class</NavLink>
            </li>
          </ul>
        </div>
        <div>
          {user && (
            <NavLink to="/profile" className="pfp">
              <img src={user.photoURL} className="pfp--img" />
            </NavLink>
          )}
          {!user && (
            <NavLink to="/signin" className="signin">
              <button>Sign In</button>
            </NavLink>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;

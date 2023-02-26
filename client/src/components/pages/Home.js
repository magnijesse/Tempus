import React from "react";

import logo from "../../../dist/Tempus.png";

// firebase auth
import { auth } from "../../../../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

import "../../styles/utilities.css";
import "../../styles/Home.css";

const Home = (props) => {
  const [user, loading] = useAuthState(auth);

  return (
    <div>
      <div className="image-container">
        <img src={logo} alt="logo" />{" "}
      </div>
      {!user && (
        <button className="button-container1" onClick={() => location.assign(`/signin`)}>
          Sign in
        </button>
      )}
      <button className="button-container1" onClick={() => location.assign(`/classsetup`)}>
        {" "}
        Add New Class
      </button>
      <button className="button-container1" onClick={() => location.assign(`/courses`)}>
        {" "}
        My Schedule
      </button>
      <button className="button-container1" onClick={() => location.assign(`/about`)}>
        About Tempus
      </button>

      {user && <button onClick={() => auth.signOut()}>Sign Out</button>}
    </div>
  );
};

export default Home;

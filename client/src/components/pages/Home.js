import React from "react";

import logo from "../../../dist/logo.png";

// firebase auth
import { auth } from "../../../../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

import "../../styles/home.css";

const Home = () => {
  const [user, loading] = useAuthState(auth);

  return (
    <div className="main">
      <img className="logo" src={logo} />
      <h1>THE NEW FREE WAY TO SCHEDULE YOUR CLASSES AND CHAT WITH YOUR CLASSMATES!!!!</h1>
    </div>
  );
};

export default Home;

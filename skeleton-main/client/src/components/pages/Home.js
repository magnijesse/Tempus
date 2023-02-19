import React from "react";
<<<<<<< HEAD

import logo from '../../../dist/Tempus.png';

=======
import { GoogleOAuthProvider, GoogleLogin, googleLogout } from "@react-oauth/google";
>>>>>>> buttonTransition

import "../../utilities.css";
import "./Home.css";

<<<<<<< HEAD
const Home = (props) => {

    //TODO: new class setup

    return (
    <div>
        <div className="image-container">
            <img src={logo} alt="logo"/> </div>
       <button className="button-container1">Log In</button>
       <button className="button-container1">Add New Class</button>
       <button className="button-container1" onClick={() => location.assign(`/courses`)}> My Schedule</button>
       <button className="button-container1">About Tempus</button>

    </div>
           
        
        
    )

}

export default Home;
=======
//TODO: REPLACE WITH YOUR OWN CLIENT_ID
const GOOGLE_CLIENT_ID = "518418044074-3o2nk4767heckhbvpo6pe1bfkvf3s361.apps.googleusercontent.com";

const Home = ({ userId, handleLogin, handleLogout }) => {

  let randomId = 1

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      {userId ? (
        <button
          onClick={() => {
            googleLogout();
            handleLogout();
          }}
        >
          Logout
          </button>
        ) : (
          <GoogleLogin onSuccess={handleLogin} onError={(err) => console.log(err)} />
        )}
        <h1>Tempus</h1>
        <h2> What you need to change in this skeleton</h2>
        
        {/* location.assing(`/courses/${id_variable}`) */}
        <button onClick={location.assign(`/courses`)}> Courses </button>

    </GoogleOAuthProvider>
  );
};

export default Home;
>>>>>>> buttonTransition

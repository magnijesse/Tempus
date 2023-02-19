import React from "react";
import { GoogleOAuthProvider, GoogleLogin, googleLogout } from "@react-oauth/google";

import "../../utilities.css";
import "./Home.css";

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

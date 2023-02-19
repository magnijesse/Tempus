import React, { useEffect, useState } from "react";
import { GoogleOAuthProvider, GoogleLogin, googleLogout } from "@react-oauth/google";

import "../../utilities.css";
import "./Home.css";

import Message from "../modules/Message";
import NewMessage from "../modules/NewMessage";

import { get, post } from "../../utilities";

//TODO: REPLACE WITH YOUR OWN CLIENT_ID
const GOOGLE_CLIENT_ID = "518418044074-3o2nk4767heckhbvpo6pe1bfkvf3s361.apps.googleusercontent.com";

const Courses = ({ userId, handleLogin, handleLogout }) => {
    return (
        <h1>Good luck on your project :)</h1>
       
      );
};

export default Courses;
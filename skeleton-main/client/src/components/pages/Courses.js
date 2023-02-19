import React, { useEffect, useState } from "react";
import { GoogleOAuthProvider, GoogleLogin, googleLogout } from "@react-oauth/google";

import "../../utilities.css";
import "./Home.css";
import SchoolClass from "../modules/SchoolClass";

//purpose = list of classes

import { get, post } from "../../utilities";
import { Routes, Route } from "react-router-dom";
import Thread from "./Thread.js";
import NotFound from "./NotFound.js";



//TODO: REPLACE WITH YOUR OWN CLIENT_ID
const GOOGLE_CLIENT_ID = "518418044074-3o2nk4767heckhbvpo6pe1bfkvf3s361.apps.googleusercontent.com";

const Courses = ({ userId, handleLogin, handleLogout }) => {
    //right now I'm manually making a SchoolClass, later use NewSchoolClass
    const[classID, setClassID] = useState("abcd");
    return (
        <div>
                    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
            <h1>Schedule for Today!</h1>
        
        <SchoolClass name = "Statistics" classid = "abcd" /> 
      </GoogleOAuthProvider>
            
        </div>


      );
};

export default Courses;
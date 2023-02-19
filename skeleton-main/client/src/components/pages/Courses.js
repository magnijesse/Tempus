import React, { useEffect, useState } from "react";
import { GoogleOAuthProvider, GoogleLogin, googleLogout } from "@react-oauth/google";

import "../../utilities.css";
import "./Home.css";
import NewSchoolClass from "../modules/NewSchoolClass";
import SchoolClass from "../modules/SchoolClass";

//purpose = list of classes

import { get, post } from "../../utilities";

//TODO: REPLACE WITH YOUR OWN CLIENT_ID
const GOOGLE_CLIENT_ID = "518418044074-3o2nk4767heckhbvpo6pe1bfkvf3s361.apps.googleusercontent.com";

const Courses = ({ userId, handleLogin, handleLogout }) => {
    //right now I'm manually making a SchoolClass, later use NewSchoolClass
    return (
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
            <h1>Schedule for Today!</h1>
        
            <SchoolClass name = "Statistics" classid = "abcd" /> 
      </GoogleOAuthProvider>


      );
};

export default Courses;
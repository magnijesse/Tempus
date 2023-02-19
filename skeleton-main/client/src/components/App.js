import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import jwt_decode from "jwt-decode";

import NotFound from "./pages/NotFound.js";

import Home from "./pages/Home.js";
import About from "./pages/About.js";
import Courses from "./pages/Courses.js"
import Thread from "./pages/Thread.js";

import ClassSetup from "./pages/ClassSetup.js";

import "../utilities.css";

import { socket } from "../client-socket.js";

import { get, post } from "../utilities";

import { nanoid } from 'nanoid'

import CoursePage from "./pages/Courses.js";


/**
 * Define the "App" component
 */
const App = () => {
  const [userId, setUserId] = useState(undefined);

  useEffect(() => {
    get("/api/whoami").then((user) => {
      if (user._id) {
        // they are registed in the database, and currently logged in.
        setUserId(user._id);
      }
    });
  }, []);

  const handleLogin = (credentialResponse) => {
    const userToken = credentialResponse.credential;
    const decodedCredential = jwt_decode(userToken);
    console.log(`Logged in as ${decodedCredential.name}`);
    post("/api/login", { token: userToken }).then((user) => {
      setUserId(user._id);
      post("/api/initsocket", { socketid: socket.id });
    });
  };

  const handleLogout = () => {
    setUserId(undefined);
    post("/api/logout");
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Home
            handleLogin={handleLogin}
            handleLogout={handleLogout}
            userId={userId}
          />
          
        }
      />

      <Route
        path="/courses"
        element={
          <Courses/>
        }
        
      />
        <Route
        path="/classsetup"
        element={
          <ClassSetup/>
        }
        
      />
        <Route
        exact
        path = '/courses/:id'
        element={
          <Thread/>
        }
        
      />
      <Route path="*" element={<NotFound />} />

      
    </Routes>
    
  );
};

export default App;

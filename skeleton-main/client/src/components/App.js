import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import jwt_decode from "jwt-decode";

import NotFound from "./pages/NotFound.js";
import Home from "./pages/Home.js";
import Thread from "./pages/Thread.js";

import "../utilities.css";

import { socket } from "../client-socket.js";

import { get, post } from "../utilities";

import Courses from "./pages/Courses.js";


/**
 * Define the "App" component
 */
const App = () => {
  const [userId, setUserId] = useState(undefined);

  useEffect(() => {
    get("/api/whoami").then((user) => {
      if (user._id) {
        console.log(user);
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
          <Courses
          />
        }
        
      />
        <Route
        exact
        path = '/courses/:id'
        element={
          <Thread
          />
        }
        
      />
      <Route path="*" element={<NotFound />} />

      
    </Routes>
    
  );
};

export default App;

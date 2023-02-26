import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import jwt_decode from "jwt-decode";

import NotFound from "./pages/NotFound.js";

import Home from "./pages/Home.js";
import About from "./pages/About.js";
import Courses from "./pages/Courses.js";
import Thread from "./pages/Thread.js";
import Login from "./pages/SignIn.js";

import ClassSetup from "./pages/ClassSetup.js";

import "../styles/utilities.css";

import { socket } from "../client-socket.js";

import { get, post } from "../utilities";

/**
 * Define the "App" component
 */
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/signin" element={<Login />} />
      <Route path="/courses" element={<Courses />} />
      <Route path="/about" element={<About />} />
      <Route path="/classsetup" element={<ClassSetup />} />
      <Route exact path="/courses/:id" element={<Thread />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;

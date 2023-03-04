import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";

import NotFound from "./pages/NotFound.js";

import Home from "./pages/Home.js";
import Contact from "./pages/Contact.js";
import Schedule from "./pages/Schedule.js";
import Thread from "./pages/Thread.js";
import Login from "./pages/SignIn.js";
import Profile from "./pages/Profile.js";

import Navbar from "./modules/Navbar.js";

import ClassSetup from "./pages/ClassSetup.js";

import "../styles/utilities.css";

import { socket } from "../client-socket.js";

import { get, post } from "../utilities";

/**
 * Define the "App" component
 */
const App = () => {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/classsetup" element={<ClassSetup />} />
        <Route exact path="/courses/:id" element={<Thread />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;

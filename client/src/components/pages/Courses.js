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

const Courses = () => {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    get("/api/classes").then((res) => {
      setClasses(
        res.map((classObj) => {
          return <SchoolClass key={classObj._id} name={classObj.name} classId={classObj.classid} />;
        })
      );
    });
  }, []);

  console.log(classes);

  return (
    <div>
      <h1>Schedule for Today!</h1>
      {classes}
    </div>
  );
};

export default Courses;

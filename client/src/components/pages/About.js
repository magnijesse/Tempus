import React from "react";
import "../../styles/utilities.css";
import "../../styles/About.css";

import Navbar from "../modules/Navbar";

const About = () => {
  return (
    <>
      <Navbar />
      <div>
        <h1>What is Tempus?</h1>
        <p>
          Tempus is a free, easy to use app <b></b>designed to help you schedule your classes and
          chat with other people in your classes.
        </p>
      </div>
    </>
  );
};

export default About;

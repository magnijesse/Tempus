import React from "react"

import logo from '../../../dist/Tempus.png'


import "../../utilities.css";
import "./Home.css";
import { ButtonHTMLAttributes } from "react";

const Home = () => {

    return (
    <div>
        <div className="image-container">
        <img src={logo} alt="logo"/>
        </div>
         
         
            <button className="button-container">Log In</button>
            <button className="button-container">Add New Class </button>
            <button className="button-container">About Tempus </button>
        
    </div>
           
        
        
    )

}

export default Home;
import React from "react";
import { useState, useEffect } from "react"
import { nanoid } from 'nanoid'

import "./ClassSetup.css"

import { get, post } from "../../utilities";


const ClassSetup = (props) => {

    const [name, setName] = useState(" ")
    const [blockNumber, setBlockNumber] = useState(0)

    const handleSubmit = event => {
        event.preventDefault()

        post("/api/classes", { name: name, classid: nanoid(), blockNumber: blockNumber }).then((res) => {
            alert("all set!")   
            location.assign("/")
        });
            
    }

    return (
        <>
            <h1>Setup a new class!</h1>

            <form>
                <h3>Class</h3>
                <input 
                    type="text"
                    value={name}
                    onChange={(event) => {
                      setName(event.target.value);
                    }}
                />
                <h3>Block Number</h3>
                <input 
                    type="number"
                    value={blockNumber}
                    onChange={(event) => {
                      setBlockNumber(event.target.value);
                    }}
                />        
                <button 
                    onClick={handleSubmit}
                >Submit</button>   
            </form>
        </>
    )

}

export default ClassSetup
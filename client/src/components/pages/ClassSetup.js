import React from "react";
import { useState, useEffect } from "react";
import { nanoid } from "nanoid";

import "../../styles/ClassSetup.css";

import Navbar from "../modules/Navbar";

import { get, post } from "../../utilities";

// firebase auth
import { auth } from "../../../../utils/firebase";

import { useAuthState } from "react-firebase-hooks/auth";

import LoginRedirect from "../modules/LoginRedirect";

const ClassSetup = (props) => {
  const [name, setName] = useState("Class Name");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndtime] = useState("");
  const [blockNumber, setBlockNumber] = useState(0);

  const [user, loading] = useAuthState(auth);

  const handleSubmit = (event) => {
    event.preventDefault();

    post("/api/classes", {
      name: name,
      classid: nanoid(),
      blockNumber: blockNumber,
      startTime: startTime,
      endTime: endTime,
    }).then((res) => {
      alert("all set!");
      location.assign("/");
    });
  };

  return (
    <>
      <Navbar />

      {!user && <LoginRedirect />}

      {user && (
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
            <h3>Start Time</h3>
            <input
              type="time"
              value={startTime}
              onChange={(event) => {
                setStartTime(event.target.value);
              }}
            />
            <h3>End Time</h3>
            <input
              type="time"
              value={endTime}
              onChange={(event) => {
                setEndtime(event.target.value);
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
            <button onClick={handleSubmit}>Submit</button>
          </form>
        </>
      )}
    </>
  );
};

export default ClassSetup;

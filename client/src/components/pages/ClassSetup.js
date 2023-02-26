import React from "react";
import { useState, useEffect } from "react";
import { nanoid } from "nanoid";

import "./ClassSetup.css";

import Navbar from "../modules/Navbar";

import { get, post } from "../../utilities";

import { auth } from "../../../../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

import LoginRedirect from "../modules/LoginRedirect";

const ClassSetup = (props) => {
  const [name, setName] = useState(" ");
  const [blockNumber, setBlockNumber] = useState(0);

  const [classId, setClassId] = useState("");

  const [user, loading] = useAuthState(auth);

  const handleSubmit = (event) => {
    event.preventDefault();

    post("/api/classes", { name: name, classid: nanoid(), blockNumber: blockNumber }).then(
      (res) => {
        alert("all set!");
        location.assign("/");
      }
    );
  };

  return (
    <>
      <Navbar />

      {!user && <LoginRedirect />}

      {user && (
        <>
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
            <button onClick={handleSubmit}>Submit</button>
          </form>
          <h1>Setup a new class!</h1>

          <h2>Or add class with code:</h2>

          <input
            type="text"
            value={classId}
            onChange={(event) => {
              setClassId(event.target.value);
            }}
          />
          <button
            onClick={() => {
              console.log(classId);

              post(`/api/users/${user.email}/classes`, {
                classId: classId,
              }).then(() => {
                alert("all set!");
              });
            }}
          >
            Add Class
          </button>
        </>
      )}
    </>
  );
};

export default ClassSetup;

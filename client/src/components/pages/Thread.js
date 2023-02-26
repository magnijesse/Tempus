import React, { useEffect, useState } from "react";

import Message from "../modules/Message";
import NewMessage from "../modules/NewMessage";
import Navbar from "../modules/Navbar";

import "../../styles/utilities.css";

import { get, post } from "../../utilities";

const Thread = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const classid = window.location.href.slice(window.location.href.lastIndexOf("/") + 1);
    get(`/api/messages?classid=${classid}`).then((messageObjs) => {
      console.log(messageObjs);
      setMessages(messageObjs);
    });
  }, []);

  return (
    <>
      <Navbar />

      <h1>MESSAGE THREAD</h1>
      <NewMessage />
      <div>
        {messages.map((messageObj) => {
          return <Message name={messageObj.name} content={messageObj.content} />;
        })}
      </div>
    </>
  );
};

export default Thread;

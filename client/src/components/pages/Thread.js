import React, { useEffect, useState } from "react";
import { GoogleOAuthProvider, GoogleLogin, googleLogout } from "@react-oauth/google";
import Message from "../modules/Message";
import NewMessage from "../modules/NewMessage";
import "../../utilities.css";
import { get, post } from "../../utilities";

//TODO: REPLACE WITH YOUR OWN CLIENT_ID
const GOOGLE_CLIENT_ID = "518418044074-3o2nk4767heckhbvpo6pe1bfkvf3s361.apps.googleusercontent.com";

const Thread = ({ userId, handleLogin, handleLogout }) => {
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

import React, { useEffect, useState } from "react";
import { GoogleOAuthProvider, GoogleLogin, googleLogout } from "@react-oauth/google";

import "../../utilities.css";
import "./Skeleton.css";

import Message from "../modules/Message";
import NewMessage from "../modules/NewMessage";

const HelloPage = ({ userId, handleLogin, handleLogout }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    get("/api/messages").then((messageObjs) => {
      setMessages(messageObjs);
    });

    setInterval(() => {
      get("/api/messages").then((messageObjs) => {
        setMessages(messageObjs);
      });
    }, 5000);
  }, []);

  return (
    <div>
      <NewMessage />
      <div>
        {messages.map((messageObj) => {
          return <Message name={messageObj.name} content={messageObj.content} />;
        })}
      </div>
    </div>
  );
};

export default HelloPage;

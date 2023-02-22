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
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      {userId ? (
        <button
          onClick={() => {
            googleLogout();
            handleLogout();
          }}
        >
          Logout
          </button>
        ) : (
          <GoogleLogin onSuccess={handleLogin} onError={(err) => console.log(err)} />
        )}
      <h1>MESSAGE THREAD</h1>
      <NewMessage />
      <div>
        {messages.map((messageObj) => {
          return <Message name={messageObj.name} content={messageObj.content} />;
        })}
      </div>

    </GoogleOAuthProvider>
  );
};

export default Thread;
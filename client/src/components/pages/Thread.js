import React, { useEffect, useState } from "react";

import Message from "../modules/Message";
import NewMessage from "../modules/NewMessage";
import LoginRedirect from "../modules/LoginRedirect";
import Loading from "../modules/Loading";

// firebase auth
import { auth } from "../../../../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

import "../../styles/thread.css";

import { get, post } from "../../utilities";

const Thread = () => {
  const [messages, setMessages] = useState([]);
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    const classid = window.location.href.slice(window.location.href.lastIndexOf("/") + 1);
    get(`/api/messages?classid=${classid}`).then((messageObjs) => {
      setMessages(messageObjs);
    });
    setInterval(() => {
      get(`/api/messages?classid=${classid}`).then((messageObjs) => {
        setMessages(messageObjs);
      });
    }, 2000);
  }, []);

  return (
    <>
      {loading && <Loading />}

      {!loading && !user && <LoginRedirect />}

      {user && (
        <>
          <h1>MESSAGE THREAD</h1>
          <NewMessage />
          <div>
            {messages.map((messageObj) => {
              return (
                <Message key={messageObj._id} name={messageObj.name} content={messageObj.content} />
              );
            })}
          </div>
        </>
      )}
    </>
  );
};

export default Thread;

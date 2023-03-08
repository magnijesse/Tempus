import React, { useEffect, useState, useRef } from "react";

import Message from "../modules/Message";
import NewMessage from "../modules/NewMessage";
import LoginRedirect from "../modules/LoginRedirect";
import Loading from "../modules/Loading";

// firebase auth
import { auth } from "../../../../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

import "../../styles/thread.css";

import { get, post, ConvertToStandard } from "../../utilities";

const Thread = () => {
  const [messages, setMessages] = useState([]);
  const [numMessages, setNumMessages] = useState(0);
  const [user, loading] = useAuthState(auth);

  const [className, setClassName] = useState("Loading...");

  const messagesEndRef = useRef(null);
  const firstRenderRef = useRef(true);

  useEffect(() => {
    const classid = window.location.href.slice(window.location.href.lastIndexOf("/") + 1);
    get(`/api/classes/${classid}`).then((res) => {
      setClassName(res.name);
    });
    get(`/api/messages?classid=${classid}`).then((messageObjs) => {
      setMessages(messageObjs);
      setNumMessages(messageObjs.length);
      if (firstRenderRef.current) {
        firstRenderRef.current = false;
        scrollToBottom();
      }
    });
    const interval = setInterval(() => {
      get(`/api/messages?classid=${classid}`).then((messageObjs) => {
        if (messageObjs.length > numMessages) {
          setMessages(messageObjs);
          setNumMessages(messageObjs.length);
        }
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [numMessages]);

  useEffect(() => {
    if (!firstRenderRef.current) {
      scrollToBottom();
    }
  }, [messages]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {loading && <Loading />}

      {!loading && !user && <LoginRedirect />}

      {user && (
        <div className="thread--main">
          <h1>{className}</h1>

          <div className="thread--messages">
            {messages.map((messageObj) => {
              return (
                <Message
                  key={messageObj._id}
                  name={messageObj.name}
                  content={messageObj.content}
                  id={messageObj.uid}
                  uid={user.uid}
                  time={messageObj.time}
                />
              );
            })}
            <div id="messagesEndRef" ref={messagesEndRef} />
          </div>

          <NewMessage />
        </div>
      )}
    </>
  );
};

export default Thread;

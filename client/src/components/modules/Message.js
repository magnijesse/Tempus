import React from "react";

import "../../styles/thread.css";

const Message = (props) => {
  return (
    <>
      {props.id !== props.uid && (
        <div className="msg left-msg">
          <div className="msg-bubble">
            <div className="msg-info">
              <div className="msg-info-name">{props.name}</div>
              <div className="msg-info-time">{props.time}</div>
            </div>
            <div className="msg-text">{props.content}</div>
          </div>
        </div>
      )}
      {props.id === props.uid && (
        <div className="msg msg-right">
          <div className="msg-bubble">
            <div className="msg-info">
              <div className="msg-info-name">{props.name}</div>
              <div className="msg-info-time">{props.time}</div>
            </div>
            <div className="msg-text">{props.content}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default Message;

import React, { useState } from "react";

import { get, post } from "../../utilities";
const NewMessage = (props) => {
  const [messageText, setMessageText] = useState("");

  return (
    <div>
      <input
        type="text"
        value={messageText}
        onChange={(event) => {
          setMessageText(event.target.value);
        }}
      />
      <button
        onClick={() => {
          console.log(messageText);
          console.log('Im here 1');
          post("/api/message", { content: messageText }).then(() => {
            setMessageText("");
          });
          console.log('Im here 2');
        }}
      >
        Send Message
      </button>
    </div>
  );
};

export default NewMessage;
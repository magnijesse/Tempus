import React, { useState } from "react";

// firebase auth
import { auth } from "../../../../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

// utils
import { get, post } from "../../utilities";

const NewMessage = (props) => {
  const [messageText, setMessageText] = useState("");
  const [user, loading] = useAuthState(auth);

  const handleKeypress = (e) => {
    //it triggers by pressing the enter key
    if (e.keyCode === 13) {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    console.log(messageText);
    const classid = window.location.pathname.split("/").pop();
    post("/api/message", {
      name: user.displayName,
      content: messageText,
      classid: classid,
    }).then(() => {
      setMessageText("");
    });
  };

  return (
    <div>
      <input
        type="text"
        value={messageText}
        onChange={(event) => {
          setMessageText(event.target.value);
        }}
        onKeyDown={handleKeypress}
      />
      <button
        // new message post request which takes the last part of the url and sets it equal to the classid
        onClick={handleSubmit}
      >
        Send Message
      </button>
    </div>
  );
};

export default NewMessage;

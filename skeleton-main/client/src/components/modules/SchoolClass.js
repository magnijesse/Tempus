import React, { useState } from "react";

import { get, post } from "../../utilities";
const SchoolClass = (props) => {
  const [schoolClass, setSchoolClass] = useState("");

  return (
    <div>
      <input
        type="text"
        value={schoolClass}
        onChange={(event) => {
            setSchoolClass(event.target.value);
        }}
      />
      <button
        onClick={() => {
          console.log(messageText);
          post("/api/message", { content: messageText }).then(() => {
            setMessageText("");
          });
        }}
      >
        Send Message
      </button>
    </div>
  );
};

export default NewMessage;
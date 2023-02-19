import React, { useState } from "react";

import { get, post } from "../../utilities";
const NewSchoolClass = (props) => {
  const [className, setClassName] = useState("");
  const [classID, setClassID] = useState("");
  setClassID("stats"); //change to random later
  return (
    <div>
      <input
        type="text"
        value={messageText}
        onChange={(event) => {
          setClassName(event.target.value);
        }}
      />


    </div>
  );
};

export default NewSchoolClass;
import React, { useState, useEffect } from "react";

import { get, post } from "../../utilities";

const CreatedClass = (props) => {
  const [schoolClass, setSchoolClass] = useState("");

  return (
    <div className="name">
      <h4>
        {props.startTime} - {props.endTime}
      </h4>
      <h3>{props.name}</h3>

      <h4>{props.classId}</h4>
    </div>
  );
};

export default CreatedClass;

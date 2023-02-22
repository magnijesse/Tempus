import React, { useState, useEffect } from "react";

import { get, post } from "../../utilities";
const SchoolClass = (props) => {
  const [schoolClass, setSchoolClass] = useState("");

  return (
    <div className="name">
      <h3>{props.name}</h3>
      <button onClick={() => location.assign(`/courses/${props.classId}`)}>
        {props.name} page{" "}
      </button>
    </div>
  );
};

export default SchoolClass;

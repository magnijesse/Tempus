import React, { useState, useEffect } from "react";

import { get, post } from "../../utilities";
const SchoolClass = (props) => {
  return (
    <div className="name">
      <h4>
        {props.startTime} - {props.endTime}
      </h4>
      <h3>{props.name}</h3>

      <button onClick={() => location.assign(`/courses/${props.classid}`)}>
        {props.name} page{" "}
      </button>
    </div>
  );
};

export default SchoolClass;

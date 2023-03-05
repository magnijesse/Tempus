import React, { useState, useEffect } from "react";

import "../../styles/schoolclass.css";

import { get, post } from "../../utilities";
const SchoolClass = (props) => {
  return (
    <button className="card" onClick={() => location.assign(`/courses/${props.classid}`)}>
      <h4 className="time">
        {props.startTime} - {props.endTime}
      </h4>
      <h3>{props.name}</h3>
    </button>
  );
};

export default SchoolClass;

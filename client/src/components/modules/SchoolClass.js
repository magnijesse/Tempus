import React, { useState, useEffect } from "react";

import "../../styles/schoolclass.css";

import { get, post } from "../../utilities";
const SchoolClass = (props) => {
  return (
    <div className="SchoolClassMain">
      <button className="card" onClick={() => location.assign(`/courses/${props.classid}`)}>
        <h4 className="time">
          {props.startTime} - {props.endTime}
        </h4>
        <h3>{props.name}</h3>
      </button>
      <button className="trashButton">
        <i className="fa-solid fa-trash"></i>
      </button>
    </div>
  );
};

export default SchoolClass;

import React, { useState } from "react";

const SchoolClass = (props) => {
  return (
    <div className = "name">
      <h3>{props.name}</h3>
      <button onClick={() => location.assign(`/courses/${props.classid}`)}> {props.name} page </button>
    
    </div>


  );
};

export default SchoolClass;
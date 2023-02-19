import React, { useState, useEffect } from "react";

import { get, post } from "../../utilities";
const SchoolClass = (props) => {
  const [schoolClass, setSchoolClass] = useState("");

  useEffect(() => {
    get("/api/classes", ).then((res) => {
      
      // they are registed in the database, and currently logged in.
      setSchoolClass(res.body.classid);
      
    });
  }, [])

  return (
    <div className = "name">
      <h3>{props.name}</h3>
      <button onClick={() => location.assign(`/courses/${schoolClass}`)}> {props.name} page </button>
    </div>


  );
};

export default SchoolClass;
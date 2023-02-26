import React, { useEffect, useState } from "react";

//styles
import "../../styles/utilities.css";

import SchoolClass from "../modules/SchoolClass";

import Navbar from "../modules/Navbar";

// firebase auth
import { auth } from "../../../../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

//purpose = list of classes

import { get, post } from "../../utilities";

const Courses = () => {
  const [user, loading] = useAuthState(auth);
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    if (!user) {
      return;
    }

    get(`/api/users/${user.email}/classes`)
      .then((classIds) => {
        return Promise.all(
          classIds.map((userClass) => {
            return get(`/api/classes/${userClass}`);
          })
        );
      })
      .then((classObjs) => {
        const schoolClasses = classObjs.map((classObj) => {
          console.log(classObj);
          return <SchoolClass key={classObj._id} name={classObj.name} classId={classObj.classid} />;
        });
        setClasses(schoolClasses);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [user]);

  console.log(classes);

  return (
    <div>
      <Navbar />

      <h1>Schedule for Today!</h1>
      {classes}
    </div>
  );
};

export default Courses;

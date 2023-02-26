import React, { useEffect, useState } from "react";

//styles
import "../../styles/utilities.css";

import SchoolClass from "../modules/SchoolClass";

import Navbar from "../modules/Navbar";
import LoginRedirect from "../modules/LoginRedirect";

// firebase auth
import { auth } from "../../../../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

//purpose = list of classes

import { get, post } from "../../utilities";

const Courses = () => {
  const [user, loading] = useAuthState(auth);
  const [classes, setClasses] = useState([]);

  const [classId, setClassId] = useState("");

  const ConvertToStandard = (time) => {
    time = time.split(":");

    const hours = Number(time[0]);
    const minutes = Number(time[1]);

    let timeValue;

    if (hours > 0 && hours <= 12) {
      timeValue = "" + hours;
    } else if (hours > 12) {
      timeValue = "" + (hours - 12);
    } else if (hours == 0) {
      timeValue = "12";
    }

    timeValue += minutes < 10 ? ":0" + minutes : ":" + minutes; // get minutes
    timeValue += hours >= 12 ? " P.M." : " A.M."; // get AM/PM

    return timeValue;
  };

  // get the users classes by their email (may change later to an id)
  useEffect(() => {
    if (!user) {
      return;
    }

    get(`/api/users/${user.email}/classes`)
      .then((classIds) => {
        const promises = classIds.map((userClass) => {
          console.log(`Calling API for classId: ${userClass}`);
          return get(`/api/classes/${userClass}`)
            .then((res) => {
              console.log(res);

              return {
                name: res.name,
                classId: res.classid,
                startTime: res.startTime,
                endTime: res.endTime,
              };
            })
            .catch((err) => {
              console.log(err);
              return null;
            });
        });

        Promise.all(promises).then((classesData) => {
          const sortedClassesData = classesData
            .filter((data) => data !== null)
            .sort((a, b) => {
              const aStartTime = new Date(`1970-01-01T${a.startTime}:00Z`);
              const bStartTime = new Date(`1970-01-01T${b.startTime}:00Z`);
              return aStartTime - bStartTime;
            });

          const schoolClasses = sortedClassesData.map((data) => {
            return (
              <SchoolClass
                key={data.classId}
                name={data.name}
                classId={data.classId}
                startTime={ConvertToStandard(data.startTime)}
                endTime={ConvertToStandard(data.endTime)}
              />
            );
          });

          setClasses(schoolClasses);
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }, [user]);

  console.log(classes);

  return (
    <div>
      <Navbar />

      {!user && <LoginRedirect />}

      {user && (
        <>
          <h1>Hi {user.displayName.split(" ")[0]}! Here's your schedule for Today!</h1>

          {classes}

          <h2>Add class with id:</h2>

          <input
            type="text"
            value={classId}
            onChange={(event) => {
              setClassId(event.target.value);
            }}
          />
          <button
            onClick={() => {
              console.log(classId);

              post(`/api/users/${user.email}/classes`, {
                classId: classId,
              }).then(() => {
                alert("all set!");
                location.reload();
              });
            }}
          >
            Add Class
          </button>
        </>
      )}
    </div>
  );
};

export default Courses;

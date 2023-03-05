import React, { useEffect, useState } from "react";

//styles
import "../../styles/utilities.css";

import SchoolClass from "../modules/SchoolClass";

import LoginRedirect from "../modules/LoginRedirect";
import Loading from "../modules/Loading";

// firebase auth
import { auth } from "../../../../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

//purpose = list of classes

import { get, post, ConvertToStandard } from "../../utilities";

const Schedule = () => {
  const [user, loading] = useAuthState(auth);
  const [classes, setClasses] = useState([]);

  const [selectedDay, setSelectedDay] = useState("m");

  const [classid, setclassid] = useState("");

  // get the users classes by their email (may change later to an id)
  useEffect(() => {
    if (!user) {
      return;
    }

    get(`/api/users/${user.email}/classes`)
      .then((classids) => {
        const promises = classids.map(async (userClass) => {
          console.log(`Calling API for classid: ${userClass}`);
          try {
            const res = await get(`/api/classes/${userClass}`);
            return {
              name: res.name,
              classid: res.classid,
              days: res.days,
              startTime: res.startTime,
              endTime: res.endTime,
            };
          } catch (err) {
            console.log(err);
            return null;
          }
        });

        Promise.all(promises).then((classesData) => {
          const sortedClassesData = classesData
            .filter((data) => data !== null)
            .sort((a, b) => {
              const aStartTime = new Date(`1970-01-01T${a.startTime}:00Z`);
              const bStartTime = new Date(`1970-01-01T${b.startTime}:00Z`);
              return aStartTime - bStartTime;
            });

          const schoolClasses = sortedClassesData
            .filter((data) => data.days.includes(selectedDay))
            .map((data) => {
              return (
                <SchoolClass
                  key={data.classid}
                  name={data.name}
                  days={data.days}
                  classid={data.classid}
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
  }, [user, selectedDay]);

  return (
    <div>
      {loading && <Loading />}

      {!loading && !user && <LoginRedirect />}

      {user && (
        <>
          <h1>Hi {user.displayName.split(" ")[0]}! Here's your schedule for this week!</h1>

          <button onClick={() => setSelectedDay("m")}>M</button>
          <button onClick={() => setSelectedDay("t")}>T</button>
          <button onClick={() => setSelectedDay("w")}>W</button>
          <button onClick={() => setSelectedDay("th")}>Th</button>
          <button onClick={() => setSelectedDay("f")}>F</button>

          {selectedDay == "m" && <h2>Monday</h2>}
          {selectedDay == "t" && <h2>Tuesday</h2>}
          {selectedDay == "w" && <h2>Wednesday</h2>}
          {selectedDay == "th" && <h2>Thursday</h2>}
          {selectedDay == "f" && <h2>Friday</h2>}

          {classes}

          <h2>Add class with id:</h2>

          <input
            type="text"
            value={classid}
            onChange={(event) => {
              setclassid(event.target.value);
            }}
          />
          <button
            onClick={() => {
              post(`/api/users/${user.email}/classes`, {
                classid: classid,
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

export default Schedule;

import React, { useEffect, useState } from "react";

//styles
import "../../styles/schedule.css";

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

    console.log(selectedDay);
  }, [user, selectedDay]);

  return (
    <div>
      {loading && <Loading />}

      {!loading && !user && <LoginRedirect />}

      {user && (
        <div className="schedule">
          <div className="greeting">
            <h1 className="greeting1">Hey {user.displayName.split(" ")[0]}!</h1>
            <h1 className="greeting2">Here's your schedule for the week!</h1>
          </div>
          <div className="dayButtons">
            {["M", "T", "W", "Th", "F"].map((day) => (
              <button
                className={selectedDay === day.toLowerCase() ? "activeButton" : "inactiveButton"}
                key={day}
                onClick={() => setSelectedDay(day.toLowerCase())}
              >
                {day}
              </button>
            ))}
          </div>

          {classes}
        </div>
      )}
    </div>
  );
};

export default Schedule;

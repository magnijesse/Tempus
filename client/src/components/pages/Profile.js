import React, { useState, useEffect } from "react";

// firebase auth
import { auth } from "../../../../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

// utils
import { get, post, ConvertToStandard } from "../../utilities";

import CreatedClass from "../modules/CreatedClass";

const Profile = () => {
  const [user, loading] = useAuthState(auth);

  const [classes, setClasses] = useState([]);

  console.log(user);

  useEffect(() => {
    if (!user) {
      return;
    }

    get(`/api/users/${user.email}/createdClasses`)
      .then((classIds) => {
        const promises = classIds.map(async (userClass) => {
          console.log(`Calling API for classId: ${userClass}`);
          try {
            const res = await get(`/api/classes/${userClass}`);
            console.log(res);
            return {
              name: res.name,
              classId: res.classid,
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

          const schoolClasses = sortedClassesData.map((data) => {
            return (
              <CreatedClass
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

  const signOut = () => {
    auth.signOut();
    window.location.href = "/";
  };

  return (
    <>
      {user && (
        <>
          <h1>Profile</h1>
          <h2>Signed in as {user.displayName}</h2>

          {classes}
          <div className="root">{user && <button onClick={signOut}>Sign Out</button>}</div>
        </>
      )}
    </>
  );
};

export default Profile;

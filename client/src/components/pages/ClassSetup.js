import React from "react";
import { useState, useEffect } from "react";
import { nanoid } from "nanoid";

import Loading from "../modules/Loading";

import { get, post } from "../../utilities";

// firebase auth
import { auth } from "../../../../utils/firebase";

import { useAuthState } from "react-firebase-hooks/auth";

import LoginRedirect from "../modules/LoginRedirect";

const ClassSetup = (props) => {
  const [user, loading] = useAuthState(auth);

  const initialValues = { name: "", startTime: "", endTime: "", blockNumber: 0 };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [days, setDays] = useState([
    { day: "m", checked: false },
    { day: "t", checked: false },
    { day: "w", checked: false },
    { day: "th", checked: false },
    { day: "f", checked: false },
  ]);

  const classid = nanoid();

  const updateDays = (event) => {
    setDays(
      days.map((day) => (day.day === event.target.name ? { ...day, checked: !day.checked } : day))
    );
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);

      post("/api/classes", {
        name: formValues.name,
        classid: classid,
        startTime: formValues.startTime,
        endTime: formValues.endTime,
        creator: user.email,
        days: days.map((day) => (day.checked ? day.day : null)).filter(Boolean),
      }).then((res) => {
        alert("all set!");
        location.assign("/");
      });
      post(`/api/users/${user.email}/createdClasses`, {
        name: formValues.name,
        classid: classid,
        startTime: formValues.startTime,
        endTime: formValues.endTime,
      });
      post(`/api/users/${user.email}/classes`, {
        classid: classid,
      });
    }
  }, [formErrors]);
  const validate = (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = "Class Name is required!";
    }
    if (!values.startTime) {
      errors.startTime = "Start Time is required!";
    }
    if (!values.endTime) {
      errors.endTime = "End Time is required";
    }

    return errors;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  return (
    <>
      {loading && <Loading />}

      {!loading && !user && <LoginRedirect />}

      {user && (
        <>
          <h1>Setup a new class!</h1>
          <form>
            <h3>Class</h3>
            <input type="text" name="name" value={formValues.name} onChange={handleChange} />
            <p>{formErrors.name}</p>
            <h3>Start Time</h3>
            <input
              type="time"
              name="startTime"
              value={formValues.startTime}
              onChange={handleChange}
            />
            <p>{formErrors.startTime}</p>
            <h3>End Time</h3>
            <input type="time" name="endTime" value={formValues.endTime} onChange={handleChange} />
            <p>{formErrors.endTime}</p>

            <input type="button" name="m" value="m" onClick={updateDays} />
            <input type="button" name="t" value="t" onClick={updateDays} />
            <input type="button" name="w" value="w" onClick={updateDays} />
            <input type="button" name="th" value="th" onClick={updateDays} />
            <input type="button" name="f" value="f" onClick={updateDays} />

            <button onClick={handleSubmit}>Submit</button>
          </form>
        </>
      )}
    </>
  );
};

export default ClassSetup;

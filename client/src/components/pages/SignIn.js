import React from "react";

import { get, post } from "../../utilities";

// firebase auth
import { auth } from "../../../../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import "../../styles/signin.css";

const SignIn = () => {
  const [user, loading] = useAuthState(auth);

  const googleProvider = new GoogleAuthProvider();
  const GoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);

      post("/api/users", {
        name: result.user.displayName,
        email: result.user.email,
        photo: result.user.photoURL,
      });

      console.log(result);

      alert("Success!");

      window.location.href = "/";
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {!user && (
        <>
          <h3>Sign in with one of the providers</h3>
          <div>
            <button onClick={GoogleLogin}>Sign in with google</button>
            <button>Sign in with facebook</button>
          </div>
        </>
      )}
    </>
  );
};

export default SignIn;

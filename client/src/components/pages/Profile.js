import React from "react";

// firebase auth
import { auth } from "../../../../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const Profile = () => {
  const [user, loading] = useAuthState(auth);

  console.log(user);

  return (
    <>
      {user && (
        <>
          <h1>Signed in as {user.displayName}</h1>
          <div className="root">
            {user && <button onClick={() => auth.signOut()}>Sign Out</button>}
          </div>
        </>
      )}
    </>
  );
};

export default Profile;

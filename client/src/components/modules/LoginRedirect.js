import React from "react";

const LoginRedirect = () => {
  return (
    <div>
      <h1>You're not logged in!</h1>
      <button
        onClick={() => {
          window.location.href = "/signin";
        }}
      >
        {" "}
        Sign in page{" "}
      </button>
    </div>
  );
};

export default LoginRedirect;

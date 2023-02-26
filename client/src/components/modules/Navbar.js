import React from "react";

const Navbar = () => {
  return (
    <>
      <button onClick={() => location.assign(`/home`)}>
        <h1>HOME</h1>
      </button>
    </>
  );
};

export default Navbar;

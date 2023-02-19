import React from "react";

const Message = (props) => {
  return (
    <div>
      {props.name}: {props.content}
    </div>
  );
};

export default Message;
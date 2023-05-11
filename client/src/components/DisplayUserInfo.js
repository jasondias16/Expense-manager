import React from "react";

function DisplayUserInfo(props) {
  return (
    <div>
      {props.fname}
      {props.lname}
      {props.email}
    </div>
  );
}

export default DisplayUserInfo;

import React, { useState } from "react";
import userIdContext from "./UserIdContex";

const UserIdState = (props) => {
  const [userId, setUserId] = useState("temp");
  const [userName, setUserName] = useState("Guest");
  return (
    <userIdContext.Provider
      value={{ userId, setUserId, userName, setUserName }}
    >
      {props.children}
    </userIdContext.Provider>
  );
};

export default UserIdState;

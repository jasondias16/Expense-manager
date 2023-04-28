import React, { useState } from "react";
import userIdContext from "./UserIdContex";

const UserIdState = (props) => {
  const [userId, setUserId] = useState("temp");

  return (
    <userIdContext.Provider value={{ userId, setUserId }}>
      {props.children}
    </userIdContext.Provider>
  );
};

export default UserIdState;

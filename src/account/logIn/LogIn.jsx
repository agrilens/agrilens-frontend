import React from "react";
import {
  useAccountContext,
  useAccountUpdateContext,
} from "../../contexts/AccountContext";

export default function LogIn() {
  const userType = useAccountContext();
  const updateUserType = useAccountUpdateContext();

  return (
    <div>
      <div>Log In : {userType}</div>
      <button onClick={updateUserType}>Click to be logged in</button>
    </div>
  );
}

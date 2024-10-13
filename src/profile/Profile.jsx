import React from "react";
import {
  useAccountContext,
  useAccountUpdateContext,
} from "../contexts/AccountContext";

export default function Profile() {
  const { userType } = useAccountContext();
  const { updateUserType } = useAccountUpdateContext();

  return (
    <div>
      <div>Profile : {userType}</div>
      <button onClick={updateUserType}>Click to change user type</button>
    </div>
  );
}

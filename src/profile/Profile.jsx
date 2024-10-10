import React, { useContext } from "react";
import {
  useAccountContext,
  useAccountUpdateContext,
} from "../contexts/AccountContext";

export default function Profile() {
  const userType = useAccountContext();
  const updateUserType = useAccountUpdateContext();

  return (
    <div>
      <div>Profile : {userType}</div>
      <button onClick={updateUserType}>Change user type</button>
    </div>
  );
}

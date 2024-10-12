import React, { useContext } from "react";
import "./HomePage.css";
import {
  useAccountContext,
  useAccountUpdateContext,
} from "../contexts/AccountContext";

export default function HomePage() {
  const { userType, userEmail } = useAccountContext();
  // console.log("userType", userType);
  const { updateUserType } = useAccountUpdateContext();

  return <div>HomePage userEmail: {userEmail}</div>;
}

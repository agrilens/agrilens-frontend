import React, { useContext } from "react";
import "./HomePage.css";
import {
  useAccountContext,
  useAccountUpdateContext,
} from "../contexts/AccountContext";

export default function HomePage() {
  const userType = useAccountContext();
  console.log("userType", userType);
  const updateUserType = useAccountUpdateContext();

  return <div>HomePage : {userType}</div>;
}
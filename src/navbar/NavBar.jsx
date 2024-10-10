import React, { useContext } from "react";
import "./NavBar.css";
import {
  useAccountContext,
  useAccountUpdateContext,
} from "../contexts/AccountContext";

export default function NavBar() {
  const userType = useAccountContext();
  const updateUserType = useAccountUpdateContext();

  return <div>NavBar </div>;
}

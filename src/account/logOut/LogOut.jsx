import React, { useState } from "react";
import { auth, GoogleProvider } from "../../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  signInWithRedirect,
} from "firebase/auth";

import {
  useAccountContext,
  useAccountUpdateContext,
} from "../../contexts/AccountContext";

export default function LogOut() {
  const { userType } = useAccountContext();
  const { updateUserType } = useAccountUpdateContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const logOut = async () => {
    try {
      console.log("currentUser: ", auth?.currentUser);

      await signOut(auth);
      localStorage.removeItem("userID");
      localStorage.removeItem("userToken");
      console.log("Logging out....");
    } catch (error) {
      console.error("Log out Error: ", error);
    }
  };

  return (
    <div>
      {/* <div>Log In : {userType}</div> */}
      <div>
        <button onClick={logOut}>Log Out</button>
      </div>
    </div>
  );
}

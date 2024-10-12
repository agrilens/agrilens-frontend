import React, { useState } from "react";
import { auth } from "../../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

import {
  useAccountContext,
  useAccountUpdateContext,
} from "../../contexts/AccountContext";

export default function SignUp() {
  const { userType } = useAccountContext();
  const { updateUserType } = useAccountUpdateContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("currentUser: ", auth?.currentUser);
    } catch (error) {
      console.log("currentUser: ", auth?.currentUser);
      console.error("Sign up error", error);
    }
  };

  return (
    <div>
      <div>
        <input
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button onClick={signUp}>Sign Up</button>
      </div>
    </div>
  );
}

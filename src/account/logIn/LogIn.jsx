import React, { useState, useEffect } from "react";
import { auth, GoogleProvider } from "../../config/firebase";
import {
  signInWithRedirect,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";

import {
  useAccountContext,
  useAccountUpdateContext,
} from "../../contexts/AccountContext";

export default function LogIn() {
  const { updateUserType, updateUserEmail } = useAccountUpdateContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("Logging in....");
      console.log("login currentUser: ", auth.currentUser);

      // Update user email and type after successful login
      const user = userCredential.user;
      await updateUserEmail(user.email);
      updateUserType("User"); // or whatever value is appropriate
    } catch (err) {
      console.log("Logging in Error", err);
      setError(err.message);
    }
  };

  const logInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, GoogleProvider);
      // await signInWithRedirect(auth, GoogleProvider);
    } catch (error) {
      console.log("Login With Google Error: ", error);
    }

    // Listen for authentication state changes
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User is logged in:", user);
        // You can also call your context update functions here
        updateUserEmail(user.email);
        updateUserType(user.displayName); // Or however you determine userType
        // Any other state updates can go here
      } else {
        console.log("No user is signed in.");
      }
    });
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
        {error && <p>{error}</p>}
      </form>
      <br />

      <div>
        <button onClick={logInWithGoogle}>Log In With Google</button>
      </div>
    </div>
  );
}

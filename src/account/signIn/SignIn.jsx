import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { auth, GoogleProvider } from "../../config/firebase";
import {
  signInWithRedirect,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";

import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import "./SignIn.css";

import {
  useAccountContext,
  useAccountUpdateContext,
} from "../../contexts/AccountContext";

export default function SignIn() {
  const { updateUserType, updateUserEmail, updateUserID, updateUserToken } =
    useAccountUpdateContext();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const savedUserID = localStorage.getItem("userID");
    const savedUserToken = localStorage.getItem("userToken");

    if (savedUserID && savedUserToken) {
      //  If the user has a valid user Id and Token, navigate to the homepage.
      navigate("/");
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      // console.log("Logging in....");
      // console.log("login currentUser: ", auth.currentUser);

      const user = auth.currentUser;
      const userEmail = user.email;
      const userID = user.uid;
      const userToken = await user.getIdToken();

      // console.log("User details:", { userEmail, userID, userToken });

      updateUserEmail(userEmail);
      updateUserID(userID);
      updateUserToken(userToken);
      updateUserType("User");

      // Save user ID and token in localStorage
      localStorage.setItem("userID", userID);
      localStorage.setItem("userToken", userToken);

      navigate("/");
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
    <div id="signIn">
      <div className="d-flex flex-column flex-end text-primary py-4">
        <div className="col-form py-4 px-2">
          <Form className="form-wrapper p-4" onSubmit={handleLogin}>
            <Col className="form-required ">
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address*</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password*</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <div className="ask-sign-up text-end">Don't have an account?</div>
              <div className="form-btns-wrapper d-flex justify-content-end ">
                <Button variant="primary" type="submit">
                  Sign In
                </Button>
                <Link
                  to="/signup"
                  variant="primary"
                  className="btn text-primary fw-bold sign-in-btn"
                >
                  Sign Up
                </Link>
              </div>
            </Col>
          </Form>
        </div>
      </div>
    </div>
  );
}

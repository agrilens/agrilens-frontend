import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { auth, GoogleProvider } from "../../config/firebase";
import { setupTokenRefresh } from "../../config/refreshToken";

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

import { useAccountUpdateContext } from "../../contexts/AccountContext";
import LoadingSpinner from "../../common/LoadingSpinner";

export default function SignIn() {
  const { updateUserType, updateUserEmail, updateUserID, updateUserToken } =
    useAccountUpdateContext();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedUserID = localStorage.getItem("userID");
    const savedUserToken = localStorage.getItem("userToken");

    if (savedUserID && savedUserToken) {
      //  If the user has a valid user Id and Token, navigate to the homepage.
      window.location.reload();
      navigate("/");
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = auth.currentUser;
      const userEmail = user.email;
      const userID = user.uid;
      const userToken = await user.getIdToken();
      const refreshToken = user.refreshToken; // Get the refreshToken

      updateUserEmail(userEmail);
      updateUserID(userID);
      updateUserToken(userToken);
      // updateUserType("User");

      // Save user ID and token in localStorage
      localStorage.setItem("userID", userID);
      localStorage.setItem("userToken", userToken);
      localStorage.setItem("refreshToken", refreshToken);

      // Start automatic token refresh timer
      setupTokenRefresh(refreshToken);

      navigate("/");
    } catch (err) {
      console.log("Logging in Error:", err);
      if (err.code === "auth/wrong-password") {
        setError("Incorrect password. Please try again.");
      } else if (err.code === "auth/user-not-found") {
        setError("No account found with this email. Please sign up.");
      } else if (err.code === "auth/invalid-email") {
        setError("Invalid email format. Please enter a valid email.");
      } else if (err.code === "auth/invalid-credential") {
        setError(
          "Invalid credentials. Please make sure you've entered a valid email and password."
        );
      } else {
        setError("Login failed. Please try again later.");
      }
    } finally {
      setLoading(false);
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
        updateUserEmail(user.email);
        updateUserType(user.displayName);
      } else {
        console.log("No user is signed in.");
      }
    });
  };

  return (
    <div id="signIn">
      <div className="d-flex flex-column flex-end text-primary py-4">
        <div className="col-form py-4 px-2">
          {loading && <LoadingSpinner />}
          {error && (
            <div
              sm="12"
              className="fs-3 alert alert-danger text-center"
              role="alert"
            >
              {error}
            </div>
          )}
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

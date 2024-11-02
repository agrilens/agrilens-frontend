import React, { useState } from "react";
import { auth } from "../../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import "./SignUp.css";

import {
  useAccountContext,
  useAccountUpdateContext,
} from "../../contexts/AccountContext";
import { Link } from "react-router-dom";

const accountTypes = ["Gardner", "Farmer", "Researcher"];

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
    <div id="signUp">
      <div className="d-flex flex-column flex-end text-primary">
        <div className="col-form py-4 px-2">
          <Form className="form-wrapper p-4">
            <Col className="form-required ">
              <Form.Group className="mb-3" controlId="formBasicFirstName">
                <Form.Label>First Name*</Form.Label>
                <Form.Control type="text" placeholder="Enter Your First Name" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" placeholder="Enter Your Last Name" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicLastName">
                <Form.Label>Account Type*</Form.Label>
                {accountTypes.map((type, ind) => (
                  <div key={ind} className="mb-3">
                    <Form.Check
                      name="userAccountType"
                      type="radio"
                      id={`default-${type}`}
                      label={type}
                    />
                  </div>
                ))}
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address*</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
                <Form.Text className="text-muted">
                  Your email won't be shared with anyone else.
                </Form.Text>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password*</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
              {/* <Button variant="primary" type="submit">
                  Submit
                </Button> */}
            </Col>
            <Col className="form-optional ms-2 mt-3">
              <h4 className="">Optional</h4>
              <p className="">
                Filling out the following helps us providing you a customized
                content
              </p>
              <h6 className="">Address:</h6>
              <div className="form-address d-flex flex-column flex-start">
                <Form.Group
                  className="mb-3 d-flex align-items-center "
                  controlId="formBasicCity"
                >
                  <Form.Label className="me-4">City: </Form.Label>
                  <Form.Control
                    className="ms-1"
                    type="text"
                    placeholder="Enter City"
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3 d-flex align-items-center "
                  controlId="formBasicState"
                >
                  <Form.Label className="me-1 d-flex flex-column">
                    <span>State/</span> <span>Province:</span>
                  </Form.Label>
                  <Form.Control type="text" placeholder="Enter State" />
                </Form.Group>
                <Form.Group
                  className="mb-3 d-flex align-items-center flex-2"
                  controlId="formBasicCountry"
                >
                  <Form.Label className="me-1">Country</Form.Label>
                  <Form.Control
                    className="ms-2"
                    type="text"
                    placeholder="Enter Country"
                  />
                </Form.Group>
                <Form.Select
                  aria-label="Default select example"
                  className="form-interest"
                >
                  <option>What's your primary interest in AgriLens?</option>
                  <option value="1">Educational purposes</option>
                  <option value="2">
                    Diagnose plant issues in my home garden
                  </option>
                  <option value="3">Professional agriculture management</option>
                  <option value="4">Scientific research and analysis</option>
                  <option value="5">Other</option>
                </Form.Select>
              </div>
              <div className="ask-sign-in text-end">
                Already have an account?
              </div>
              <div className="form-btns-wrapper d-flex justify-content-end ">
                <Button variant="primary" type="submit">
                  Sign Up
                </Button>
                <Link
                  to="/signin"
                  className="btn text-primary fw-bold sign-in-btn"
                >
                  Sign In
                </Link>
              </div>
            </Col>
          </Form>
        </div>
      </div>
      {/* <div>
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
      </div> */}
    </div>
  );
}

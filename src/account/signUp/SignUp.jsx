import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import { auth } from "../../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

import "./SignUp.css";

import {
  useAccountContext,
  useAccountUpdateContext,
} from "../../contexts/AccountContext";
import LoadingSpinner from "../../common/LoadingSpinner";

export default function SignUp() {
  const { userType, userEmail, userName, userID, userToken, userAccDetail } =
    useAccountContext();
  const {
    updateUserType,
    updateUserEmail,
    updateUserName,
    updateUserID,
    updateUserToken,
    updateUserAccDetail,
  } = useAccountUpdateContext();

  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [accountType, setAccountType] = useState("Gardner");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [userInterest, setUserInterest] = useState("");

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successUserId, setSuccessUserId] = useState(null);

  const createUserDBUrl_dev =
    "http://127.0.0.1:5001/agrilens-web/us-central1/app/users/customer";
  const createUserDBUrl_prod =
    "https://app-id543mmv6a-uc.a.run.app/users/customer";

  const accountTypes = ["Gardner", "Farmer", "Researcher"];

  const validateForm = () => {
    const newErrors = {};
    if (!firstName) newErrors.firstName = "First Name is required";
    if (!email) newErrors.email = "Email address is required";
    if (!password) newErrors.password = "Password is required";
    return newErrors;
  };

  const signUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("currentUser: ", auth?.currentUser?.uid);
      return auth?.currentUser;
    } catch (error) {
      console.log("currentUser: ", auth?.currentUser);
      console.error("Sign up error", error);
    }
  };

  const createUserDb = async (url, data, headers = {}) => {
    try {
      setLoading(true);
      const response = await axios.post(url, data, headers);
      console.log("Response:", response.data);
      console.log("Response:", response.status);
      let jsonString = response?.data;

      console.log("data: ", jsonString);
    } catch (err) {
      console.error("fetchData() Error:", err);
      setServerError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      console.log(">>>> No Invalid inputs detected.");

      const currentUser = await signUp();
      const UID = currentUser?.uid;
      console.log("currentUser: ", currentUser);
      console.log("currentUser UID: ", currentUser?.uid);

      if (UID) {
        console.log("Valid UID: ", UID);
        setSuccessUserId(() => UID);
        const accountDetail = {
          firstName: firstName,
          lastName: lastName,
          type: accountType,
          email: email,
          city: city,
          state: state,
          country: country,
          userInterest: userInterest,
          uid: UID,
        };

        console.log("accountDetail: ", accountDetail);
        await createUserDb(createUserDBUrl_dev, accountDetail);
        await updateUserAccDetail(accountDetail);
        await updateUserEmail(accountDetail.email);
        await updateUserName(accountDetail.firstName + accountDetail.lastName);
        await updateUserType(accountDetail.type);

        navigate("/profile");
      }
    } else {
      console.log(">>>> Invalid inputs detected.");

      setErrors(formErrors);
    }
  };

  return (
    <div id="signUp">
      <div className="d-flex flex-column flex-end text-primary">
        <div className="col-form py-4 px-2">
          {loading && <LoadingSpinner />}
          {Object.keys(errors).length > 0 && (
            <Alert variant="danger">
              {Object.values(errors).map((error, index) => (
                <div key={index}>{error}</div>
              ))}
            </Alert>
          )}
          <Form className="form-wrapper p-4" onSubmit={handleSignUp}>
            <Col className="form-required ">
              <Form.Group className="mb-3" controlId="formBasicFirstName">
                <Form.Label>First Name*</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Your First Name"
                  value={firstName}
                  isInvalid={!!errors.firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.firstName}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Your Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
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
                      value={type}
                      checked={accountType === type}
                      onChange={(e) => setAccountType(e.target.value)}
                    />
                  </div>
                ))}
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address*</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  autoComplete="username"
                  isInvalid={!!errors.email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Form.Text className="text-muted">
                  Your email won't be shared with anyone else.
                </Form.Text>
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password*</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  autoComplete="current-password"
                  isInvalid={!!errors.password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              </Form.Group>
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
                  className="mb-3 d-flex align-items-center"
                  controlId="formBasicCity"
                >
                  <Form.Label className="me-4">City: </Form.Label>
                  <Form.Control
                    className="ms-1"
                    type="text"
                    placeholder="Enter City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3 d-flex align-items-center"
                  controlId="formBasicState"
                >
                  <Form.Label className="me-1 d-flex flex-column">
                    <span>State/</span> <span>Province:</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter State"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                  />
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
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  />
                </Form.Group>
                <Form.Select
                  aria-label="Default select example"
                  className="form-interest"
                  value={userInterest}
                  onChange={(e) => setUserInterest(e.target.value)}
                >
                  <option>What's your primary interest in AgriLens?</option>
                  <option value="Educational purposes">
                    Educational purposes
                  </option>
                  <option value="Home garden diagnosis">
                    Diagnose plant issues in my home garden
                  </option>
                  <option value="Professional agriculture management">
                    Professional agriculture management
                  </option>
                  <option value="Scientific research and analysis">
                    Scientific research and analysis
                  </option>
                  <option value="Other">Other</option>
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
    </div>
  );
}

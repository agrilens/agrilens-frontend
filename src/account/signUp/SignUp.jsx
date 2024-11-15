import React, { useState, useEffect } from "react";
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

import { Modal, Tabs, Tab } from "react-bootstrap";

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
  const [showLegal, setShowLegal] = useState(false);

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successUserId, setSuccessUserId] = useState(null);

  const createUserDBUrl_dev =
    "http://127.0.0.1:5001/agrilens-web/us-central1/app/users/customer";
  const createUserDBUrl_prod =
    "https://app-id543mmv6a-uc.a.run.app/users/customer";

  const accountTypes = ["Gardner", "Farmer", "Researcher"];

  useEffect(() => {
    const savedUserID = localStorage.getItem("userID");
    const savedUserToken = localStorage.getItem("userToken");

    if (savedUserID && savedUserToken) {
      //  If the user has a valid user Id and Token, navigate to the homepage.
      navigate("/");
    }
  }, [navigate]);

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
              <br></br>
              <div className="agreement-text text-muted text-center mb-3">
                By signing up, you agree to our{" "}
                <button
                  type="button"
                  className="legal-link"
                  onClick={() => setShowLegal(true)}
                  style={{
                    background: "none",
                    border: "none",
                    padding: 0,
                    color: "#0d6efd",
                    textDecoration: "underline",
                    cursor: "pointer",
                  }}
                >
                  Terms of Service and Privacy Policy
                </button>
                {/* 
                  Legal Documents Modal 
                  Link to conversation: https://claude.site/artifacts/d3859245-07d9-405c-9eee-34b7313ac98e
                */}
                <Modal
                  show={showLegal}
                  onHide={() => setShowLegal(false)}
                  size="lg"
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Legal Documents</Modal.Title>
                  </Modal.Header>
                  <Modal.Body style={{ maxHeight: "70vh", overflowY: "auto" }}>
                    <Tabs defaultActiveKey="tos" className="mb-3">
                      <Tab eventKey="tos" title="Terms of Service">
                        <h2>Terms of Service</h2>
                        <p className="text-muted">
                          Last Updated: November 14, 2024
                        </p>
                        <h3>1. Agreement to Terms</h3>
                        <p>
                          By accessing and using AgriLens ("App"), you agree to
                          be bound by these Terms of Service ("Terms"). If you
                          disagree with any part of these terms, you may not
                          access the App.
                        </p>
                        <h3>2. Description of Service</h3>
                        <p>
                          This App is designed to analyze plant health through
                          user-submitted images, providing automated analysis
                          and diagnosis of plant conditions through advanced
                          image processing technology.
                        </p>
                        <h3>3. User Accounts</h3>
                        <ul>
                          <li>
                            You must provide accurate and complete information
                            when creating an account
                          </li>
                          <li>
                            You are responsible for maintaining the
                            confidentiality of your account credentials
                          </li>
                          <li>
                            You are responsible for all activities that occur
                            under your account
                          </li>
                        </ul>
                        <h3>4. Acceptable Use</h3>
                        <p>You agree not to:</p>
                        <ul>
                          <li>Use the App for any illegal purposes</li>
                          <li>Share your account credentials with others</li>
                          <li>
                            Attempt to gain unauthorized access to any part of
                            the App
                          </li>
                          <li>
                            Upload or share inappropriate or harmful content
                          </li>
                          <li>Interfere with or disrupt the App or servers</li>
                          <li>Violate any applicable laws or regulations</li>
                        </ul>
                        <h3>5. Intellectual Property</h3>
                        <p>
                          All content, features, and functionality of the App
                          are owned by us and are protected by international
                          copyright, trademark, and other intellectual property
                          laws.
                        </p>
                        <h3>6. Termination</h3>
                        <p>
                          We reserve the right to terminate or suspend your
                          account and access to the App at our sole discretion,
                          without notice, for conduct that we believe violates
                          these Terms or is harmful to other users, us, or third
                          parties, or for any other reason.
                        </p>
                        <h3>7. Disclaimer of Warranties</h3>
                        <p>
                          The App is provided "as is" and "as available" without
                          any warranties of any kind, either express or implied.
                        </p>
                        <h3>8. Limitation of Liability</h3>
                        <p>
                          In no event shall we be liable for any indirect,
                          incidental, special, consequential, or punitive
                          damages resulting from your use or inability to use
                          the App.
                        </p>
                        <h3>9. Contact Us</h3>
                        <p>
                          If you have questions about these Terms or Privacy
                          Policy, please contact us at{" "}
                          <a href="mailto:agrilens303@gmail.com">
                            agrilens303@gmail.com
                          </a>
                        </p>
                        <p>
                          Generated using Claude 3.5 LLM:{" "}
                          <a href="https://claude.site/artifacts/d3859245-07d9-405c-9eee-34b7313ac98e">
                            Claude conversation
                          </a>
                        </p>
                      </Tab>
                      <Tab eventKey="privacy" title="Privacy Policy">
                        <h2>Privacy Policy</h2>
                        <p className="text-muted">
                          Last Updated: November 14, 2024
                        </p>

                        <h3>1. Information We Collect</h3>
                        <h4>Personal Information</h4>
                        <ul>
                          <li>Name and email address</li>
                          <li>Profile information you provide</li>
                          <li>Device information and IP address</li>
                          <li>Images you upload for analysis</li>
                        </ul>

                        <h4>Usage Information</h4>
                        <ul>
                          <li>App usage statistics</li>
                          <li>Performance data</li>
                          <li>Feature interaction data</li>
                        </ul>

                        <h3>2. How We Use Your Information</h3>
                        <p>We use collected information to:</p>
                        <ul>
                          <li>Provide and maintain the App</li>
                          <li>Improve user experience</li>
                          <li>Communicate with you about the App</li>
                          <li>Ensure App security</li>
                          <li>Comply with legal obligations</li>
                        </ul>

                        <h3>3. Data Storage and Security</h3>
                        <ul>
                          <li>
                            We implement appropriate security measures to
                            protect your information
                          </li>
                          <li>Data is stored on secure servers</li>
                          <li>
                            We regularly review and update our security
                            practices
                          </li>
                        </ul>

                        <h3>4. Information Sharing</h3>
                        <p>
                          We do not sell your personal information. We may share
                          your information:
                        </p>
                        <ul>
                          <li>With your consent</li>
                          <li>To comply with legal obligations</li>
                          <li>
                            With service providers who assist in operating the
                            App
                          </li>
                          <li>
                            In the event of a merger, acquisition, or sale of
                            assets
                          </li>
                        </ul>

                        <h3>5. User Rights</h3>
                        <p>You have the right to:</p>
                        <ul>
                          <li>Access your personal information</li>
                          <li>Correct inaccurate information</li>
                          <li>Request deletion of your information</li>
                          <li>Opt-out of certain data collection</li>
                          <li>Export your data</li>
                        </ul>

                        <h3>6. Data Retention</h3>
                        <p>We retain your information for as long as:</p>
                        <ul>
                          <li>Your account is active</li>
                          <li>Needed to provide you services</li>
                          <li>Required by law</li>
                          <li>Necessary for legitimate business purposes</li>
                        </ul>

                        <h3>7. Children's Privacy</h3>
                        <p>
                          This App is intended for users who are 13 years of age
                          or older. We do not knowingly collect information from
                          children under 13 without parental consent.
                        </p>

                        <h3>8. Changes to Privacy Policy</h3>
                        <p>
                          We may update this Privacy Policy from time to time.
                          We will notify users of any material changes via email
                          or through the App.
                        </p>

                        <h3>9. Contact Us</h3>
                        <p>
                          If you have questions about these Terms or Privacy
                          Policy, please contact us at{" "}
                          <a href="mailto:agrilens303@gmail.com">
                            agrilens303@gmail.com
                          </a>
                        </p>
                        <p>
                          Generated using Claude 3.5 LLM:{" "}
                          <a href="https://claude.site/artifacts/d3859245-07d9-405c-9eee-34b7313ac98e">
                            Claude conversation
                          </a>
                        </p>
                      </Tab>
                    </Tabs>
                  </Modal.Body>
                </Modal>
              </div>
            </Col>
          </Form>
        </div>
      </div>
    </div>
  );
}

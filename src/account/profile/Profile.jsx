import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../config/firebase";
import { signOut } from "firebase/auth";
import axios from "axios";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import "./Profile.css";
import {
  useAccountContext,
  useAccountUpdateContext,
} from "../../contexts/AccountContext";
import LoadingSpinner from "../../common/LoadingSpinner";
import emptyFileImage from "../../assets/images/emptyFileImage.png";

const url = process.env.REACT_APP_BACKEND_API_URL;

export const Profile = () => {
  const [editProfile, setEditProfile] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const {
    userID,
    userToken,
    userType,
    userEmail,
    userFName,
    userLName,
    userAccDetail,
  } = useAccountContext();
  const {
    updateUserType,
    updateUserEmail,
    updateUserFName,
    updateUserLName,
    updateUserAccDetail,
  } = useAccountUpdateContext();
  const navigate = useNavigate();
  useEffect(() => {}, []);
  useEffect(() => {}, [userType, userEmail, userFName, userLName]);

  const handleCancelBtn = () => setEditProfile(false);
  const handleEditBtn = () => setEditProfile(!editProfile);

  const handleFirstNameChange = (e) => updateUserFName(e.target.value);
  const handleLastNameChange = (e) => updateUserLName(e.target.value);
  const handleEmailChange = (e) => updateUserEmail(e.target.value);
  const handleTypeChange = (e) => updateUserType(e.target.value);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = () => setProfileImage(reader.result);
      reader.readAsDataURL(file);
    }
  };
  const handleSaveProfileImage = async () => {
    if (!imageFile) return;

    const formData = new FormData();
    formData.append("profileImage", imageFile);

    try {
      const response = await axios.post(`${url}/account/picture`, formData, {
        headers: {
          Authorization: `Bearer ${userToken}`,
          userID: userID,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        const updatedImageUrl = response.data.imageUrl;
        setProfileImage(updatedImageUrl);
        updateUserAccDetail({ profileImage: updatedImageUrl });
        alert("Profile image updated successfully!");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload profile image.");
    }
  };

  const handleUpdateBtn = async () => {
    // await handleSaveProfileImage();
    setEditProfile(false);
    updateUserAccDetail({
      firstName: userFName,
      lastName: userLName,
      type: userType,
      // email: userEmail,
      // city: "Denver",
      // state: "",
      // country: "US",
      // userInterest: "Other",
    });
  };

  const logOut = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("userID");
      localStorage.removeItem("userToken");
      localStorage.removeItem("refreshToken");
      // console.log("Logging out....");
      navigate("/");
      window.location.reload();
    } catch (error) {
      console.error("Log out Error: ", error);
    }
  };

  return (
    <div>
      <div id="profile" className="m-auto">
        <Container className="text-primary py-4">
          <Row className="profile-wrapper d-flex p-4 ">
            <Col xm="12" sm="4" className="profile-picture ">
              <Image
                src={profileImage || emptyFileImage}
                className="mb-4 d-block m-auto"
                style={{
                  maxWidth: "419px",
                  width: "100%",
                  borderRadius: "20px",
                }}
                rounded
              />
              {/* {editProfile && (
                <div className="mb-3">
                  <Form.Label>Upload Profile Picture</Form.Label>
                  <Form.Control
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </div>
              )} */}
            </Col>
            <Col xm="12" sm="6" className="profile-detail p-3 ">
              <div className="d-flex gap-2 align-items-center">
                <h4>Name:</h4>
                <div>{!editProfile && userFName + " " + userLName}</div>
              </div>
              {editProfile && (
                <>
                  <InputGroup className="mb-3">
                    <InputGroup.Text id="inputGroup-sizing-name">
                      First Name
                    </InputGroup.Text>
                    <Form.Control
                      value={userFName}
                      onChange={handleFirstNameChange}
                      aria-label="userFName"
                      aria-describedby="inputGroup-sizing-name"
                    />
                  </InputGroup>
                  <InputGroup className="mb-3">
                    <InputGroup.Text id="inputGroup-sizing-name">
                      Last Name
                    </InputGroup.Text>
                    <Form.Control
                      value={userLName}
                      onChange={handleLastNameChange}
                      aria-label="userLName"
                      aria-describedby="inputGroup-sizing-name"
                    />
                  </InputGroup>
                </>
              )}
              <div className="d-flex gap-2 align-items-center">
                <h4>Email:</h4>
                <div>{userEmail}</div>
                {/* <div>{!editProfile && userEmail}</div> */}
              </div>
              {/* {editProfile && (
                <InputGroup className="mb-3">
                  <InputGroup.Text id="inputGroup-sizing-email">
                    Email
                  </InputGroup.Text>
                  <Form.Control
                    value={userEmail}
                    onChange={handleEmailChange}
                    aria-label="Email"
                    aria-describedby="inputGroup-sizing-email"
                  />
                </InputGroup>
              )} */}
              <div className="d-flex gap-2 align-items-center">
                <h4>Account Type:</h4>
                <div>{!editProfile && userType}</div>
              </div>
              {editProfile && (
                <Form.Select
                  value={userType}
                  onChange={handleTypeChange}
                  aria-label="Select Account Type"
                >
                  <option>Choose Account Type</option>
                  <option value="Gardener">Gardener</option>
                  <option value="Farmer">Farmer</option>
                  <option value="Researcher">Researcher</option>
                </Form.Select>
              )}
              <div className="account-details border-top p-2 ">
                <ul>
                  <li>
                    <span className="fw-bolder">City: </span>
                    {userAccDetail?.city}
                  </li>
                  <li>
                    <span className="fw-bolder">State: </span>{" "}
                    {userAccDetail?.state}
                  </li>
                  <li>
                    <span className="fw-bolder">Country: </span>{" "}
                    {userAccDetail?.country}
                  </li>
                  <li>
                    <span className="fw-bolder">Use of AgriLens: </span>{" "}
                    {userAccDetail?.userInterest}
                  </li>
                </ul>
              </div>
            </Col>
            <Col
              sm="12"
              className="profile-edit-btn mt-4 gap-2 d-flex justify-content-end"
            >
              {editProfile ? (
                <>
                  <Button
                    variant="secondary"
                    onClick={handleCancelBtn}
                    className="px-4 fw-bold"
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="primary"
                    onClick={handleUpdateBtn}
                    className="px-5"
                  >
                    Save
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="primary"
                    onClick={handleEditBtn}
                    className="px-4"
                  >
                    Edit Profile
                  </Button>
                  <Button variant="primary" onClick={logOut} className="px-4">
                    Log Out
                  </Button>
                </>
              )}
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Profile;

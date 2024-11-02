import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import "./Profile.css";
import emptyFileImage from "../../assets/images/emptyFileImage.png";

export const Profile = () => {
  const [editProfile, setEditProfile] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [profileName, setProfileName] = useState("User Full Name");
  const [profileEmail, setProfileEmail] = useState("user@example.com");
  const [profileType, setProfileType] = useState("Gardner");

  const handleNameChange = (e) => setProfileName(e.target.value);
  const handleEmailChange = (e) => setProfileEmail(e.target.value);
  const handleTypeChange = (e) => setProfileType(e.target.value);

  const handleCancelBtn = () => setEditProfile(false);
  const handleEditBtn = () => setEditProfile(!editProfile);

  const handleUpdateBtn = () => {
    setEditProfile(false);
  };

  return (
    <div>
      <div id="profile">
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
            </Col>
            <Col xm="12" sm="6" className="profile-detail p-3 ">
              {/* Name Section */}
              <div className="d-flex gap-2 align-items-center">
                <h4>Name:</h4>
                <div>{!editProfile && profileName}</div>
              </div>
              {editProfile && (
                <InputGroup className="mb-3">
                  <InputGroup.Text id="inputGroup-sizing-name">
                    Name
                  </InputGroup.Text>
                  <Form.Control
                    value={profileName}
                    onChange={handleNameChange}
                    aria-label="Name"
                    aria-describedby="inputGroup-sizing-name"
                  />
                </InputGroup>
              )}
              <div className="d-flex gap-2 align-items-center">
                <h4>Email:</h4>
                <div>{!editProfile && profileEmail}</div>
              </div>
              {editProfile && (
                <InputGroup className="mb-3">
                  <InputGroup.Text id="inputGroup-sizing-email">
                    Email
                  </InputGroup.Text>
                  <Form.Control
                    value={profileEmail}
                    onChange={handleEmailChange}
                    aria-label="Email"
                    aria-describedby="inputGroup-sizing-email"
                  />
                </InputGroup>
              )}
              <div className="d-flex gap-2 align-items-center">
                <h4>Account Type:</h4>
                <div>{!editProfile && profileType}</div>
              </div>
              {editProfile && (
                <Form.Select
                  value={profileType}
                  onChange={handleTypeChange}
                  aria-label="Select Account Type"
                >
                  <option>Choose Account Type</option>
                  <option value="Gardner">Gardner</option>
                  <option value="Farmer">Farmer</option>
                  <option value="Researcher">Researcher</option>
                </Form.Select>
              )}
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
                    className="px-2 fw-bold"
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="primary"
                    onClick={handleUpdateBtn}
                    className="px-4"
                  >
                    Save
                  </Button>
                </>
              ) : (
                <Button
                  variant="primary"
                  onClick={handleEditBtn}
                  className="px-4"
                >
                  Edit Profile
                </Button>
              )}
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Profile;

import React, { useState } from "react";
import { Link } from "react-router-dom";

import Card from "react-bootstrap/Card";

import defaultImg from "../assets/images/AgriLensLogo1.png";

const MemberCard = ({ member }) => {
  const imgSrc = member.imgSrc || defaultImg;
  return (
    <Card
      id="memberCard"
      style={{ width: "16rem" }}
      className="text-center text-primary p-0 mt-5"
    >
      <Card.Img variant="top" src={imgSrc} style={{ height: "16rem" }} />
      <Card.Body>
        <Card.Title className="fw-bold">{member.name}</Card.Title>
        <Card.Text>{member.role}</Card.Text>
        <div className="member-links d-flex justify-content-center gap-4 ">
          <Link to={member.linkedInLink}>
            {member.linkedInLink && <i className="fa-brands fa-linkedin" />}
          </Link>
          <Link to={member.gitHubLink}>
            {member.gitHubLink && <i className="fa-brands fa-square-github" />}
          </Link>
        </div>
      </Card.Body>
    </Card>
  );
};

export default MemberCard;

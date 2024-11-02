import React from "react";
import { Link } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "./Footer.css";

import AgriLens from "../common/AgriLens";
import gitHubLogo from "../assets/images/gitHubLogo.png";

const Footer = () => {
  return (
    <footer id="footer">
      <Container
        fluid
        className="footer-container footer-links text-white text-start py-5"
      >
        <Row className="">
          <Col sm="8" className=" text-start ">
            <Link to="/">
              <AgriLens />
            </Link>

            <p className="ps-2">
              Revolutionizing Agriculture through AI Vision Technology
            </p>
            <div className="p-2 ps-4 mb-sm-3 footer-logo">
              {/* <img src={gitHubLogo} alt="" /> */}
              <Link to="https://github.com/agrilens">
                <img src={gitHubLogo} alt="" />
              </Link>
            </div>
          </Col>
          <Col xs="6" sm="2" className="ps-4">
            <h4>Pages</h4>
            <div className="d-flex flex-column">
              <Link to="/" className="footer-contact-link text-white">
                Home
              </Link>
              <Link to="/insights">Insights</Link>
              <Link to="/dashboard">Dashboard</Link>
              <Link to="/pages">Pages</Link>
            </div>
          </Col>
          <Col xs="6" sm="2" className="ps-4">
            <div className="d-flex flex-column ">
              <h4 className="footer-about text-nowrap">About</h4>
              <Link to="/aboutus">About Us</Link>
              <Link to="/aboutus">Our Team</Link>
              <Link to="contactus">Contact Us</Link>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;

import React, { useState } from "react";
import { Link } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Modal } from "react-bootstrap";

import "./Footer.css";

import AgriLens from "../common/AgriLens";
import LegalTerms from "../common/LegalTerms";
import gitHubLogo from "../assets/images/gitHubLogo.png";

const Footer = () => {
  const [showLegal, setShowLegal] = useState(false);

  return (
    <footer id="footer">
      <Container
        fluid
        className="footer-container footer-links text-white text-start py-4"
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
            <div>
              <p>
                This work by <span>AgriLens Team</span> is licensed under{" "}
                <a
                  href="https://creativecommons.org/licenses/by-sa/4.0/?ref=chooser-v1"
                  target="_blank"
                  rel="license noopener noreferrer"
                  style={{ display: "inline-block" }}
                >
                  Creative Commons Attribution-ShareAlike 4.0 International
                  <img
                    style={{
                      height: "22px",
                      marginLeft: "3px",
                      verticalAlign: "text-bottom",
                    }}
                    src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1"
                    alt="CC"
                  />
                  <img
                    style={{
                      height: "22px",
                      marginLeft: "3px",
                      verticalAlign: "text-bottom",
                    }}
                    src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1"
                    alt="BY"
                  />
                  <img
                    style={{
                      height: "22px",
                      marginLeft: "3px",
                      verticalAlign: "text-bottom",
                    }}
                    src="https://mirrors.creativecommons.org/presskit/icons/sa.svg?ref=chooser-v1"
                    alt="SA"
                  />
                </a>
              </p>
            </div>
          </Col>
          <Col xs="6" sm="2" className="ps-4">
            <h4>Pages</h4>
            <div className="d-flex flex-column">
              <Link to="/" className="footer-contact-link text-white">
                Home
              </Link>
              <Link to="/dashboard">Dashboard</Link>
              <Link to="/insights">Insights</Link>
            </div>
          </Col>
          <Col xs="6" sm="2" className="ps-4">
            <div className="d-flex flex-column ">
              <h4 className="footer-about text-nowrap">About</h4>
              <Link to="/aboutus">About Us</Link>
              <Link to="/aboutus#ourTeam">Our Team</Link>
              <Link to="contactus">Contact Us</Link>
              <div className="agreement-text text-muted  mb-3">
                <p
                  type="button"
                  className="legal-link"
                  onClick={() => setShowLegal(true)}
                  style={{
                    background: "none",
                    color: "#FFF",
                    textDecoration: "underline",
                    cursor: "pointer",
                    textWrap: "wrap",
                    // width: "20px",
                  }}
                >
                  Terms of Service and Privacy Policy
                </p>
                {/* 
                  Legal Documents Modal 
                  Link to conversation: https://claude.site/artifacts/d3859245-07d9-405c-9eee-34b7313ac98e
                */}
                <Modal
                  show={showLegal}
                  onHide={() => setShowLegal(false)}
                  size="lg"
                >
                  <LegalTerms />
                </Modal>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;

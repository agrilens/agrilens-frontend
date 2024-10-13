import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
import { useAccountContext } from "../contexts/AccountContext";

import AgriLens from "../common/AgriLens";
import AgriLensWithLogo from "../common/AgriLensWithLogo";
import userLoggedInIcon from "../assets/images/userLoggedInIcon.png";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";

export default function NavBar() {
  const { userType } = useAccountContext();

  const [expanded, setExpanded] = useState(false);
  const handleNavClick = () => {
    setExpanded(false);
  };

  return (
    <div id="navbar">
      <Navbar
        key="lg"
        expand="lg"
        expanded={expanded}
        onToggle={() => setExpanded(!expanded)}
        className="bg-body-tertiary mb-3"
      >
        <Container fluid>
          <Navbar.Brand href="/">
            <Nav.Link as={Link} to="/" onClick={handleNavClick}>
              <AgriLensWithLogo />
            </Nav.Link>
          </Navbar.Brand>
          <Navbar.Brand as={Link} to="/" onClick={handleNavClick}>
            <AgriLensWithLogo />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-lg`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-lg`}
            aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-lg`}>
                <Nav.Link as={Link} to="/" onClick={handleNavClick}>
                  <AgriLens />
                </Nav.Link>
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Header closeButton className="offcanvas-header">
              <Offcanvas.Title
                id={`offcanvasNavbarLabel-expand-lg`}
                as={Link}
                to="/"
                onClick={handleNavClick}
                className="offcanvas-title"
              >
                <AgriLens />
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link as={Link} to="/" onClick={handleNavClick}>
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to="/about" onClick={handleNavClick}>
                  About Us
                </Nav.Link>
                <Nav.Link as={Link} to="/pages" onClick={handleNavClick}>
                  Pages
                </Nav.Link>
                <Nav.Link as={Link} to="/contact" onClick={handleNavClick}>
                  Contact Us
                </Nav.Link>
                <Nav.Link as={Link} to="/dashboard" onClick={handleNavClick}>
                  Dashboard
                </Nav.Link>
              </Nav>
              <div
                className={`acc-btn align-items-center ${userType === "FARMER" ? "d-none" : ""}`}
              >
                <Nav.Link
                  as={Link}
                  to="/login"
                  onClick={handleNavClick}
                  className="py-1 text-center login-btn "
                >
                  Log In
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/signup"
                  onClick={handleNavClick}
                  className="py-1 text-center signup-btn "
                >
                  Sign Up
                </Nav.Link>
              </div>
              <div
                className={`acc-view  ${userType === "FARMER" ? "" : "d-none"}`}
              >
                <div className="acc-type text-center">
                  {userType}
                  <span>
                    <i class="fa-solid fa-square-check ms-3"></i>
                    <i className="fa-solid fa-square-check ms-3"></i>
                  </span>
                </div>
                <Link
                  to="/profile"
                  onClick={handleNavClick}
                  className="text-center"
                >
                  <img src={userLoggedInIcon} alt="User is Logged In Icon" />
                </Link>
              </div>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </div>
  );
}

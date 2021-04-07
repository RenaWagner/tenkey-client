import React from "react";
import { NavLink } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import tenkeyLogo from "../../logo.png";

export default function NavBar() {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand as={NavLink} to="/">
        <img src={tenkeyLogo} alt="TENKEY" style={{ height: 50 }} />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav style={{ width: "100%" }} fill>
          <Nav.Item>
            <Nav.Link
              activeStyle={{ fontWeight: "bold" }}
              as={NavLink}
              to="/"
              exact
            >
              Home
            </Nav.Link>
            <Nav.Link
              activeStyle={{ fontWeight: "bold" }}
              as={NavLink}
              to="/login"
            >
              Login
            </Nav.Link>
          </Nav.Item>
          {/* {loginLogoutControls} */}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

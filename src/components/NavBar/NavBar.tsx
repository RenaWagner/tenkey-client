import React from "react";
import { NavLink } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

export default function NavBar() {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand as={NavLink} to="/">
        Weather && Clothes
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
            {/* <Nav.Link
              activeStyle={{ fontWeight: "bold" }}
              as={NavLink}
              to="/forecast"
              exact
            >
              Weekly Forecast
            </Nav.Link> */}
          </Nav.Item>
          {/* {loginLogoutControls} */}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

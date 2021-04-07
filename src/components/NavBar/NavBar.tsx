import React from "react";
import { NavLink } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import tenkeyLogo from "../../logo.png";
import { useDispatch, useSelector } from "react-redux";
import { selectUserToken } from "../../store/user/selectors";
import { Button } from "react-bootstrap";
import { logout } from "../../store/user/actions";

export default function NavBar() {
  const isLoggedIn = useSelector(selectUserToken);
  const dispatch = useDispatch();

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
              Today's Weather
            </Nav.Link>
            <Nav.Link
              activeStyle={{ fontWeight: "bold" }}
              as={NavLink}
              to="/style"
            >
              Today's Style
            </Nav.Link>
            {isLoggedIn ? (
              <Button onClick={() => dispatch(logout())}>Logout</Button>
            ) : (
              <Nav.Link
                activeStyle={{ fontWeight: "bold" }}
                as={NavLink}
                to="/login"
              >
                Login
              </Nav.Link>
            )}
          </Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

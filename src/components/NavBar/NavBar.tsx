import React from "react";
import { NavLink } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import tenkeyLogo from "../../logo.png";
import { useDispatch, useSelector } from "react-redux";
import { selectUserToken } from "../../store/user/selectors";
import { Button, Dropdown, NavDropdown } from "react-bootstrap";
import { logout } from "../../store/user/actions";
import { PersonCircle } from "react-bootstrap-icons";

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
        <Nav className="justify-content-center" style={{ width: "100%" }} fill>
          <Nav.Item>
            <Nav.Link
              activeStyle={{ fontWeight: "bold" }}
              as={NavLink}
              to="/"
              exact
            >
              Outfit
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              activeStyle={{ fontWeight: "bold" }}
              as={NavLink}
              to="/weather"
            >
              Weather
            </Nav.Link>
          </Nav.Item>
          {isLoggedIn ? (
            <Nav.Item>
              <Nav.Link
                activeStyle={{ fontWeight: "bold" }}
                as={NavLink}
                to="/upload"
              >
                Upload Your Outfit
              </Nav.Link>
            </Nav.Item>
          ) : (
            <></>
          )}
          {isLoggedIn ? (
            <Nav.Item>
              <Nav.Link
                activeStyle={{ fontWeight: "bold" }}
                as={NavLink}
                to="/profile/style"
              >
                All Uploaded Styles
              </Nav.Link>
            </Nav.Item>
          ) : (
            <></>
          )}
          {isLoggedIn ? (
            <Nav.Item>
              <Nav.Link
                activeStyle={{ fontWeight: "bold" }}
                as={NavLink}
                to="/profile"
              >
                <PersonCircle color="black" size={32} />
              </Nav.Link>
            </Nav.Item>
          ) : (
            <></>
          )}
          {isLoggedIn ? (
            <Button
              onClick={() => dispatch(logout)}
              style={{ width: 100 }}
              className="mx-auto"
            >
              Logout
            </Button>
          ) : (
            <Nav.Item>
              <Nav.Link
                activeStyle={{ fontWeight: "bold" }}
                as={NavLink}
                to="/login"
              >
                Login
              </Nav.Link>
            </Nav.Item>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

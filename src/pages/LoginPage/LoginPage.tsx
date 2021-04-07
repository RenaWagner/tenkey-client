import React, { FormEvent, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { login } from "../../store/user/actions";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();

  const formSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(login(email, password, history));
  };

  return (
    <div className="mt-2 d-flex justify-content-center align-items-center">
      <Form onSubmit={formSubmit}>
        <h2 className="mt-5">Log In</h2>
        <img />
        <Form.Group as={Row} controlId="formGroupEmail">
          <Form.Label column sm="3">
            Email
          </Form.Label>
          <Col sm="9">
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formGroupPassword">
          <Form.Label column sm="3">
            Password
          </Form.Label>
          <Col sm="9">
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Col>
        </Form.Group>
        <Link to="/signup">
          If you do not have an account yet, sign up here.
        </Link>
        <br></br>
        <Button type="submit">Log in</Button>
      </Form>
    </div>
  );
}

import React, { useState, FormEvent } from "react";
import { Form, Col, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { signup } from "../../store/user/actions";

export default function SignupPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    type: "",
    sensitiveness: "",
  });

  const formSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(signup(data, history));
  };

  return (
    <div className="mt-2 d-flex justify-content-center align-items-center">
      <Form onSubmit={formSubmit}>
        <h2 className="mt-5">Sign Up</h2>
        <img />
        <Form.Row>
          <Form.Group as={Col}>
            <Form.Control
              placeholder="First name"
              required
              onChange={(e) => setData({ ...data, firstName: e.target.value })}
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Control
              placeholder="Last name"
              required
              onChange={(e) => setData({ ...data, lastName: e.target.value })}
            />
          </Form.Group>
        </Form.Row>
        <Form.Group>
          <Form.Control
            type="email"
            placeholder="Email address"
            required
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="password"
            placeholder="password"
            required
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Choose clothing type:</Form.Label>
          <Form.Control
            as="select"
            required
            value={data.type}
            onChange={(e) => setData({ ...data, type: e.target.value })}
          >
            <option value="female">Female</option>
            <option value="male">Male</option>
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Choose sensitiveness:</Form.Label>
          <Form.Control
            as="select"
            value={data.sensitiveness}
            onChange={(e) =>
              setData({ ...data, sensitiveness: e.target.value })
            }
          >
            <option value="none">Not sensitive</option>
            <option value="heat">Sensitive to Heat</option>
            <option value="cold">Sensitive to Cold</option>
          </Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

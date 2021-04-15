import React, { useState, FormEvent, useEffect } from "react";
import { Form, Col, Button } from "react-bootstrap";
import { PersonSquare } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { signup } from "../../store/user/actions";
import { selectUserToken } from "../../store/user/selectors";

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

  const isLoggedIn = useSelector(selectUserToken);

  const formSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(signup(data, history));
  };

  useEffect(() => {
    if (isLoggedIn !== "") {
      history.push("/");
    }
  }, [isLoggedIn, history]);

  return (
    <div className="mt-2 d-flex justify-content-center align-items-center">
      <Form onSubmit={formSubmit}>
        <h2 className="mt-5">Sign Up</h2>
        <PersonSquare color="orange" size={46} className="mt-3 mb-3" />
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
          <Form.Label style={{ float: "left" }}>
            Choose clothing type:
          </Form.Label>
          <Form.Control
            as="select"
            required
            value={data.type}
            onChange={(e) => setData({ ...data, type: e.target.value })}
          >
            <option value="">Choose...</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label style={{ float: "left" }}>
            Choose sensitivity:
          </Form.Label>
          <Form.Control
            as="select"
            value={data.sensitiveness}
            onChange={(e) =>
              setData({ ...data, sensitiveness: e.target.value })
            }
          >
          <option value="">Choose...</option>
            <option value="none">I'm not sensitive to heat/cold</option>
            <option value="heat">I'm sensitive to heat</option>
            <option value="cold">I'm sensitive to cold</option>
          </Form.Control>
        </Form.Group>
        <Link to="/login">
          If you already have an account, log in from here
        </Link>
        <br></br>
        <Button variant="primary" type="submit" className="mt-3">
          Submit
        </Button>
      </Form>
    </div>
  );
}

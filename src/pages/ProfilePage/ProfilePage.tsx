import React, { FormEvent, useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { updateProfile } from "../../store/user/actions";
import { selectUserToken } from "../../store/user/selectors";

export default function ProfilePage() {
  const [data, setData] = useState({
    type: "",
    sensitiveness: "",
  });
  const dispatch = useDispatch();
  const history = useHistory();
  const isLoggedIn = useSelector(selectUserToken);

  useEffect(() => {
    if (isLoggedIn === "") {
      history.push("/login");
    }
  }, [isLoggedIn, history]);

  const formSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(updateProfile(data));
  };

  return (
    <div>
      <Form onSubmit={formSubmit}>
        <Form.Group>
          <Form.Label>Choose clothing type:</Form.Label>
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
          <Form.Label>Choose sensitiveness:</Form.Label>
          <Form.Control
            as="select"
            value={data.sensitiveness}
            onChange={(e) =>
              setData({ ...data, sensitiveness: e.target.value })
            }
          >
            <option value="">Choose...</option>
            <option value="none">Not sensitive</option>
            <option value="heat">Sensitive to Heat</option>
            <option value="cold">Sensitive to Cold</option>
          </Form.Control>
        </Form.Group>
        <Button type="submit" variant="primary">
          Update
        </Button>
      </Form>
    </div>
  );
}

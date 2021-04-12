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
    <div className="mx-auto w-75" style={{ maxWidth: 300 }}>
      <h3 className="mt-4 mb-5">Update Your Setting</h3>
      <Form onSubmit={formSubmit}>
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
            Choose sensitiveness:
          </Form.Label>
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
        <Button type="submit" variant="primary" className="mt-4">
          Update
        </Button>
      </Form>
    </div>
  );
}

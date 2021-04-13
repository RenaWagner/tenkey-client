import React, { FormEvent, useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { updateProfile } from "../../store/user/actions";
import { selectUser, selectUserToken } from "../../store/user/selectors";

export default function ProfilePage() {
  const userData = useSelector(selectUser);
  const [data, setData] = useState({
    type: userData.clothingType || " ",
    sensitiveness: userData.sensitiveness || " ",
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
            Choose fashion type:
          </Form.Label>
          <Form.Control
            as="select"
            required
            value={data.type}
            onChange={(e) => setData({ ...data, type: e.target.value })}
          >
            <option value="">Choose...</option>
            <option value="female">Women</option>
            <option value="male">Men</option>
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label style={{ float: "left" }}>
            Choose sensitivity to Temperature:
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
        <Button type="submit" variant="success" className="mt-4">
          Update
        </Button>
        <Link to="/profile">
          <Button variant="secondary" className="ml-5 mt-4">
            Cancel
          </Button>
        </Link>
      </Form>
    </div>
  );
}

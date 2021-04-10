import React, { useEffect } from "react";
import { Button, ListGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { selectUserToken, selectUser } from "../../store/user/selectors";

export default function ShowProfilePage() {
  const userData = useSelector(selectUser);
  const history = useHistory();
  const isLoggedIn = useSelector(selectUserToken);

  useEffect(() => {
    if (isLoggedIn === "") {
      history.push("/login");
    }
  }, [isLoggedIn, history]);

  return (
    <div>
      <h3>Your Profile</h3>
      <ListGroup variant="flush">
        <ListGroup.Item disabled>
          First Name: {userData.firstName}
        </ListGroup.Item>
        <ListGroup.Item disabled>Last Name: {userData.lastName}</ListGroup.Item>
        <ListGroup.Item disabled>Email: {userData.email}</ListGroup.Item>
        <ListGroup.Item>
          Sensitiveness: {userData.sensitiveness}{" "}
          <Link to="/profile/update">
            <Button variant="outline-success" size="sm">
              Update
            </Button>
          </Link>
        </ListGroup.Item>
        <ListGroup.Item>
          Clothing Type: {userData.clothingType}{" "}
          <Link to="/profile/update">
            <Button variant="outline-success" size="sm">
              Update
            </Button>
          </Link>
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
}

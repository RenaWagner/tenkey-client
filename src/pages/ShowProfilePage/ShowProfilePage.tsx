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
    <div className="w-75 mx-auto" style={{ maxWidth: 350 }}>
      <h3 className="mt-4 mb-3">Your Profile</h3>
      <ListGroup variant="flush">
        <ListGroup.Item disabled>
          <span style={{ float: "left" }}>First Name:</span>{" "}
          <span style={{ float: "right" }}>{userData.firstName}</span>
        </ListGroup.Item>
        <ListGroup.Item disabled>
          <span style={{ float: "left" }}>Last Name:</span>{" "}
          <span style={{ float: "right" }}>{userData.lastName}</span>
        </ListGroup.Item>
        <ListGroup.Item disabled>
          {" "}
          <span style={{ float: "left" }}>Email:</span>{" "}
          <span style={{ float: "right" }}>{userData.email}</span>
        </ListGroup.Item>
        <ListGroup.Item>
          <span style={{ float: "left" }}>Sensitivity:</span>
          {userData.sensitiveness}
          <Link to="/profile/update">
            <Button
              variant="outline-success"
              size="sm"
              style={{ float: "right" }}
            >
              Update
            </Button>
          </Link>
        </ListGroup.Item>
        <ListGroup.Item>
          <span style={{ float: "left" }}>Fashion Type:</span>{" "}
          {userData.clothingType}{" "}
          <Link to="/profile/update">
            <Button
              variant="outline-success"
              size="sm"
              style={{ float: "right" }}
            >
              Update
            </Button>
          </Link>
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
}

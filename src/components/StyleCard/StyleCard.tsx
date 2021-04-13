import React, { useState } from "react";
import { Form, Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  selectPublicStyles,
  selectTypePublicStyles,
  selectUserStyles,
  selectPublicStylesWithRating,
  selectStyleLoading,
} from "../../store/recommendation/selectors";
import { selectUserToken } from "../../store/user/selectors";
import PublicStyleCarousel from "../PublicStyleCarousel/PublicStyleCarousel";
import UserStyleCarousel from "../UserStyleCarousel/UserStyleCarousel";

export default function StyleCard() {
  const publicStyles = useSelector(selectPublicStyles);
  const [type, setType] = useState("");
  const typeStyles = useSelector(selectTypePublicStyles(type));
  const userStyles = useSelector(selectUserStyles);
  const isLoggedIn = useSelector(selectUserToken);
  const publicStyleWithRating = useSelector(selectPublicStylesWithRating);
  const isLoading = useSelector(selectStyleLoading);

  return (
    <div>
      {isLoading ? <Spinner animation="border"></Spinner> : <></>}
      {isLoggedIn ? (
        <div>
          {userStyles.length ? (
            <div>
              <h5 className="mt-3">Your style</h5>
              <UserStyleCarousel data={userStyles} type="user" />
            </div>
          ) : (
            <div>
              <h5 className="mt-3">Your style</h5>
              <p>No style for this weather is uploaded</p>
            </div>
          )}

          <h5 className="mt-3">General style</h5>
          <UserStyleCarousel data={publicStyleWithRating} type="public" />
        </div>
      ) : (
        <div>
          <div>
            <Link to="/login">
              <h6 className="mt-3 mb-3">
                To upload your own outfits, please register.
              </h6>
            </Link>
            <Form
              inline
              className="mt-2 d-flex justify-content-center align-items-center"
            >
              <Form.Group>
                <Form.Row>
                  <Form.Label>Filter by fashion: </Form.Label>
                  <Form.Control
                    as="select"
                    required
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                  >
                    <option value="all">All</option>
                    <option value="female">Women</option>
                    <option value="male">Men</option>
                  </Form.Control>
                </Form.Row>
              </Form.Group>
            </Form>
            {type === "" && !typeStyles.length ? (
              <PublicStyleCarousel data={publicStyles} />
            ) : (
              <PublicStyleCarousel data={typeStyles} />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

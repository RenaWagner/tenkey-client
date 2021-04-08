import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import {
  selectPublicStyles,
  selectTypePublicStyles,
  selectUserStyles,
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

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <h6>Your own styles based on today's temperature</h6>
          <UserStyleCarousel data={userStyles} />
          <h6>General style recommendations</h6>
        </div>
      ) : (
        <div>
          <div>
            <Form>
              <Form.Group>
                <Form.Label>Filter by clothing type:</Form.Label>
                <Form.Control
                  as="select"
                  required
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  <option value="all">All</option>
                  <option value="female">Female style</option>
                  <option value="male">Male style</option>
                </Form.Control>
              </Form.Group>
            </Form>
            {type === "" && !typeStyles.length ? (
              <PublicStyleCarousel data={publicStyles} />
            ) : (
              <PublicStyleCarousel data={typeStyles} />
            )}
          </div>
          ) : (<p></p>
        </div>
      )}
    </div>
  );
}

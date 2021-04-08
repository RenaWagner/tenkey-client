import React, { useState } from "react";
import { Carousel, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import {
  selectPublicStyles,
  selectTypePublicStyles,
} from "../../store/recommendation/selectors";
import { StyleData } from "../../store/recommendation/types";
import StyleCarousel from "../StyleCarousel/StyleCarousel";

export default function StyleCard() {
  const publicStyles = useSelector(selectPublicStyles);
  const [type, setType] = useState("");

  const typeStyles = useSelector(selectTypePublicStyles(type));

  return (
    <div>
      {publicStyles ? (
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
            <StyleCarousel data={publicStyles} />
          ) : (
            <StyleCarousel data={typeStyles} />
          )}
        </div>
      ) : (
        <p></p>
      )}
    </div>
  );
}

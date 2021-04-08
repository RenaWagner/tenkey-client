import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import {
  selectPublicStyles,
  selectTypePublicStyles,
} from "../../store/recommendation/selectors";
import { StyleData } from "../../store/recommendation/types";

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
          {type === "" && !typeStyles.length
            ? publicStyles.map((style: StyleData) => {
                return (
                  <img
                    key={style.id}
                    src={style.imageUrl}
                    alt={`${style.id} style`}
                  />
                );
              })
            : typeStyles.map((style: StyleData) => {
                return (
                  <img
                    key={style.id}
                    src={style.imageUrl}
                    alt={`${style.id} style`}
                  />
                );
              })}
        </div>
      ) : (
        <p></p>
      )}
    </div>
  );
}

import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import StarRatingComponent from "react-star-rating-component";
import {
  updateCommentUserStyle,
  updateRatingUserStyle,
} from "../../store/recommendation/actions";
import { selectUserStyleWithId } from "../../store/recommendation/selectors";

type Params = {
  type: string;
  id: string;
};

export default function UpdateStylePage() {
  const dispatch = useDispatch();
  const route_params: Params = useParams();
  const type = route_params.type; //user or public
  const id = parseInt(route_params.id); //user's id or public's id
  const userTypeStyle = useSelector(selectUserStyleWithId(id)); //type === user
  //   console.log(userTypeStyle);
  const [rating, setRating] = useState(null || userTypeStyle?.rating);
  const [comment, setComment] = useState("" || userTypeStyle?.comment);

  const clickedStar = (nextValue: number) => {
    setRating(nextValue);
    dispatch(updateRatingUserStyle(id, rating));
  };

  const submitComment = () => {
    dispatch(updateCommentUserStyle(id, comment));
  };

  return (
    <div>
      <p>Update the style</p>
      {type === "user" && userTypeStyle ? (
        <div>
          <img src={userTypeStyle.imageUrl} />
          <br></br>
          <StarRatingComponent
            name="rating"
            starCount={5}
            value={rating ? rating : 0}
            onStarClick={clickedStar}
          />
          <Form>
            <Form.Group>
              <Form.Label>Comment:</Form.Label>
              <Form.Control
                type="text"
                value={comment}
                required
                onChange={(e) => setComment(e.target.value)}
              />
            </Form.Group>
            <Button onClick={submitComment}>Update</Button>
          </Form>
        </div>
      ) : (
        <p></p>
      )}
    </div>
  );
}

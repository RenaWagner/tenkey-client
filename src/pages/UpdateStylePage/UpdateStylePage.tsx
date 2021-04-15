import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import StarRatingComponent from "react-star-rating-component";
import {
  updateCommentUserStyle,
  updateRatingPublicStyle,
  updateRatingUserStyle,
} from "../../store/recommendation/actions";
import {
  selectPublicStyleWithId,
  selectUserStyleWithId,
} from "../../store/recommendation/selectors";
import {
  selectUserAllWithId,
  selectUserToken,
} from "../../store/user/selectors";

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
  const userAllIdStyle = useSelector(selectUserAllWithId(id));
  const userStyle = userTypeStyle ? userTypeStyle : userAllIdStyle;
  const publicTypeStyle = useSelector(selectPublicStyleWithId(id));
  const baseRating =
    publicTypeStyle && publicTypeStyle.users
      ? publicTypeStyle.users[0].publicstyleRatings?.rating
      : 0;
  const [rating, setRating] = useState(null || userTypeStyle?.rating);
  const [comment, setComment] = useState("" || userTypeStyle?.comment);
  const [publicRating, setPublicRating] = useState(null || baseRating);
  const history = useHistory();
  const isLoggedIn = useSelector(selectUserToken);

  useEffect(() => {
    if (isLoggedIn === "") {
      history.push("/login");
    }
  }, [isLoggedIn, history]);

  const clickedStar = (nextValue: number) => {
    setRating(nextValue);
    dispatch(updateRatingUserStyle(id, nextValue));
  };

  const submitComment = () => {
    dispatch(updateCommentUserStyle(id, comment));
  };

  const clickedStarPublic = (nextValue: number) => {
    setPublicRating(nextValue);
    dispatch(updateRatingPublicStyle(id, nextValue));
  };

  return (
    <div className="mx-auto w-75" style={{ maxWidth: 400 }}>
      <h3 className="mt-3 mb-3">Update the outfit</h3>
      {type === "user" && userStyle ? (
        <div>
          <img
            src={userStyle.imageUrl}
            alt="style preview"
            className="mx-auto w-75 mb-4"
            style={{ maxWidth: 400 }}
          />
          <br></br>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <p>Rating: </p>
            <StarRatingComponent
              name="rating"
              starCount={5}
              value={rating ? rating : 0}
              onStarClick={clickedStar}
            />
          </div>
          <Form>
            <Form.Group>
              <Form.Label style={{ float: "left" }}>Comment:</Form.Label>
              <Form.Control
                type="text"
                as="textarea"
                rows={3}
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
      {type === "public" && publicTypeStyle ? (
        <div>
          <img src={publicTypeStyle.imageUrl} alt="style preview" />
          <br></br>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <p>Rating: </p>
            <StarRatingComponent
              name="rating"
              starCount={5}
              value={publicRating ? publicRating : 0}
              onStarClick={clickedStarPublic}
            />
          </div>
        </div>
      ) : (
        <p></p>
      )}
    </div>
  );
}

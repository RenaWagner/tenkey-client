import React from "react";
import { Button, Carousel } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import StarRatingComponent from "react-star-rating-component";
import {
  updateRatingUserStyle,
  updateRatingPublicStyle,
} from "../../store/recommendation/actions";
import {
  UserStyleData,
  UserRatingPublicStyle,
} from "../../store/recommendation/types";

type Props = {
  data: UserStyleData[] | UserRatingPublicStyle[];
  type: string;
};

export default function UserStyleCarousel(props: Props) {
  const dataType = props.type;
  const dispatch = useDispatch();

  const clickedUserStar = (
    nextValue: number,
    prevValue: number,
    name: string
  ) => {
    const id = parseInt(name);
    dispatch(updateRatingUserStyle(id, nextValue));
  };

  const clickedPublicStar = (
    nextValue: number,
    prevValue: number,
    name: string
  ) => {
    const id = parseInt(name);
    dispatch(updateRatingPublicStyle(id, nextValue));
  };

  return (
    <div
      style={{ maxWidth: "100%" }}
      className="mt-2 d-flex justify-content-center align-items-center"
    >
      <Carousel className="mt-3">
        {props.data.map((style: any) => {
          return (
            <Carousel.Item key={style.id}>
              <img
                key={style.id}
                src={style.imageUrl}
                alt={`${style.id} style`}
                style={{ maxWidth: "100%", maxHeight: 700 }}
              />
              <Carousel.Caption
                style={{
                  backgroundColor: `rgba(255, 139, 61, 0.5)`,
                  color: "white",
                  minWidth: 200,
                  margin: "auto",
                  marginRight: 0,
                }}
                className="p-5"
              >
                {style.hasOwnProperty("rating") ? (
                  <StarRatingComponent
                    name={style.id}
                    starCount={5}
                    value={style.rating}
                    onStarClick={clickedUserStar}
                  />
                ) : (
                  <StarRatingComponent
                    name={style.id}
                    starCount={5}
                    onStarClick={clickedPublicStar}
                    value={
                      style.users ? style.users[0].publicstyleRatings.rating : 0
                    }
                  />
                )}
                <br></br>
                {style.hasOwnProperty("comment") ? style.comment : <></>}
                <br></br>
                {dataType === "user" ? (
                  <Link to={`/update/${props.type}/${style.id}`}>
                    <Button variant="danger">Update this style</Button>
                  </Link>
                ) : (
                  <></>
                )}
              </Carousel.Caption>
            </Carousel.Item>
          );
        })}
      </Carousel>
    </div>
  );
}

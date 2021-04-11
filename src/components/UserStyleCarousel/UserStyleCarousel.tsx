import React from "react";
import { Button, Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
import StarRatingComponent from "react-star-rating-component";
import {
  UserStyleData,
  UserRatingPublicStyle,
} from "../../store/recommendation/types";

type Props = {
  data: UserStyleData[] | UserRatingPublicStyle[];
  type: string;
};

export default function UserStyleCarousel(props: Props) {
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
                }}
                className="p-5"
              >
                {style.hasOwnProperty("rating") ? (
                  <StarRatingComponent
                    name="rating"
                    starCount={5}
                    value={style.rating}
                    editing={false}
                  />
                ) : (
                  <StarRatingComponent
                    name="rating"
                    starCount={5}
                    value={
                      style.users ? style.users[0].publicstyleRatings.rating : 0
                    }
                  />
                )}
                <br></br>
                {style.hasOwnProperty("comment") ? style.comment : <></>}
                <br></br>
                <Link to={`/update/${props.type}/${style.id}`}>
                  <Button variant="danger">Update this style</Button>
                </Link>
              </Carousel.Caption>
            </Carousel.Item>
          );
        })}
      </Carousel>
    </div>
  );
}

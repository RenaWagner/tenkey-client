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
    <div>
      <Carousel className="mt-5">
        {props.data.map((style: any) => {
          return (
            <Carousel.Item key={style.id}>
              <img
                key={style.id}
                src={style.imageUrl}
                alt={`${style.id} style`}
              />
              <Carousel.Caption
                style={{
                  backgroundColor: "orange",
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

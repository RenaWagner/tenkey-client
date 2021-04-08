import React, { useEffect, useState } from "react";
import { Button, Carousel } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import StarRatingComponent from "react-star-rating-component";
import { UserStyleData } from "../../store/recommendation/types";
import { selectUserToken } from "../../store/user/selectors";

type Props = {
  data: UserStyleData[];
};

type Data = UserStyleData;

export default function UserStyleCarousel(props: Props) {
  return (
    <div>
      <Carousel className="mt-5">
        {props.data.map((style: Data) => {
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
                <h3>Aloha</h3>
                <StarRatingComponent
                  name="rating"
                  starCount={5}
                  value={style.rating}
                />
                <p>{style.comment}</p>
                <Button variant="danger">Update this style</Button>
              </Carousel.Caption>
            </Carousel.Item>
          );
        })}
      </Carousel>
    </div>
  );
}

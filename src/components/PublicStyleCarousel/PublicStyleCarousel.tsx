import React from "react";
import { Carousel } from "react-bootstrap";
import { StyleData } from "../../store/recommendation/types";

type Props = {
  data: StyleData[];
};

type Data = StyleData;

export default function PublicStyleCarousel(props: Props) {
  return (
    <div
      style={{ maxWidth: "100%" }}
      className="mt-2 d-flex justify-content-center align-items-center"
    >
      <Carousel className="mt-3">
        {props.data.map((style: Data) => {
          return (
            <Carousel.Item key={style.id}>
              <img
                style={{ maxWidth: "100%", maxHeight: 700 }}
                key={style.id}
                src={style.imageUrl}
                alt={`${style.id} style`}
              />
            </Carousel.Item>
          );
        })}
      </Carousel>
    </div>
  );
}

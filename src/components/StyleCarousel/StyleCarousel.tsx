import React from "react";
import { Carousel } from "react-bootstrap";
import { StyleData } from "../../store/recommendation/types";

type Props = {
  data: StyleData[];
};
export default function StyleCarousel(props: Props) {
  return (
    <div>
      <Carousel className="mt-5">
        {props.data.map((style: StyleData) => {
          return (
            <Carousel.Item key={style.id}>
              <img
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

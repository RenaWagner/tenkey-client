import React, { useEffect } from "react";
import { Button, Carousel } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import StarRatingComponent from "react-star-rating-component";
import { getAllUserStyles } from "../../store/user/actions";
import {
  selectUserAllStyles,
  selectUserToken,
} from "../../store/user/selectors";
import { UserUploadedStyles } from "../../store/user/types";

export default function ShowUserOutfitPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const isLoggedIn = useSelector(selectUserToken);

  useEffect(() => {
    if (isLoggedIn === "") {
      history.push("/login");
    }
  }, [isLoggedIn, history]);

  useEffect(() => {
    dispatch(getAllUserStyles());
  }, [dispatch]);

  const userAllStyles = useSelector(selectUserAllStyles);
  console.log(userAllStyles);
  return (
    <div className="mx-auto w-75" style={{ maxWidth: 400 }}>
      <h3 className="mt-4 mb-5">Your Uploaded Styles</h3>
      <div
        style={{ maxWidth: "100%" }}
        className="mt-2 d-flex justify-content-center align-items-center"
      >
        <Carousel className="mt-3">
          {userAllStyles?.map((style: UserUploadedStyles) => {
            return (
              <Carousel.Item key={style.id}>
                <img
                  style={{ maxWidth: "100%", maxHeight: 700 }}
                  key={style.id}
                  src={style.imageUrl}
                  alt={`${style.id} style`}
                />
                <Carousel.Caption
                  style={{
                    backgroundColor: `rgba(255, 139, 61, 0.5)`,
                    color: "white",
                  }}
                  className="p-5"
                >
                  <StarRatingComponent
                    name="rating"
                    starCount={5}
                    value={style.rating}
                    editing={false}
                  />
                  <br></br>
                  {style.hasOwnProperty("comment") ? style.comment : <></>}
                  <br></br>
                  <Link to={`/update/user/${style.id}`}>
                    <Button variant="danger">Update this style</Button>
                  </Link>
                </Carousel.Caption>
              </Carousel.Item>
            );
          })}
        </Carousel>
      </div>
    </div>
  );
}

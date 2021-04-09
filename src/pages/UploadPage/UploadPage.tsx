import React, { FormEvent, useEffect, useState } from "react";
import { Button, Col, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import StarRatingComponent from "react-star-rating-component";
import { uploadStyle } from "../../store/recommendation/actions";
import { selectUserToken } from "../../store/user/selectors";

export default function UploadPage() {
  const today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0");
  var yyyy = today.getFullYear();
  const todaysDate = yyyy + "-" + mm + "-" + dd;

  const [data, setData] = useState({
    date: todaysDate,
    temperature: "0",
    comment: " ",
    rating: 0,
  });
  const [url, setUrl] = useState("");
  const history = useHistory();
  const isLoggedIn = useSelector(selectUserToken);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoggedIn === "") {
      history.push("/login");
    }
  }, [isLoggedIn, history]);

  const uploadImage = async (e: any) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "a85w3og2");
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/rswagner/image/upload",
      {
        method: "POST",
        body: data,
      }
    );

    const file = await res.json();
    console.log(file);
    const url = file.url;
    setUrl(url);
  };

  const clickedStar = (nextValue: number) => {
    setData({ ...data, rating: nextValue });
  };

  const uploadFile = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(uploadStyle(data, url));
    setData({
      date: todaysDate,
      temperature: "0",
      comment: " ",
      rating: 0,
    });
    setUrl("");
  };

  return (
    <div>
      <h2 className="mt-5">Upload Your Style</h2>
      <Form className="mt-5">
        <Form.File
          label="Upload your image:"
          type="file"
          name="file"
          onChange={uploadImage}
        />
      </Form>
      <Form onSubmit={uploadFile}>
        <Form.Row>
          <Form.Group as={Col}>
            <Form.Label>Date: </Form.Label>
            <Form.Control
              type="date"
              required
              value={data.date}
              onChange={(e) => setData({ ...data, date: e.target.value })}
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Feeling Temperature (°C): </Form.Label>
            <Form.Control
              type="number"
              required
              value={data.temperature}
              onChange={(e) =>
                setData({ ...data, temperature: e.target.value })
              }
            />
          </Form.Group>
        </Form.Row>
        <Form.Group>
          <Form.Label>Comment: </Form.Label>
          <Form.Control
            type="text"
            placeholder="Comment"
            required
            value={data.comment}
            onChange={(e) => setData({ ...data, comment: e.target.value })}
          />
        </Form.Group>
        <StarRatingComponent
          name="rating"
          starCount={5}
          value={data.rating}
          onStarClick={clickedStar}
        />
        <br></br>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

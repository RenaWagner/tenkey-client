import React from "react";
import {
  Button,
  Card,
  ListGroup,
  ListGroupItem,
  Spinner,
} from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  selectTodayWeather,
  selectLoading,
} from "../../store/weather/selectors";

export default function WeatherToday() {
  const todayWeatherArray = useSelector(selectTodayWeather);
  const todayWeather = todayWeatherArray[0];
  const isLoading = useSelector(selectLoading);

  return (
    <div id="weatherToday">
      {isLoading ? (
        <div
          className="d-flex justify-content-center align-items-center mt-5"
          style={{ height: 700, margin: "auto" }}
        >
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <p></p>
      )}
      {todayWeather ? (
        <div
          className="d-flex justify-content-center mt-5 mb-5"
          style={{ width: "70%", margin: "auto" }}
        >
          <Card className="text-center">
            <Card.Header>Today's Weather</Card.Header>
            <Card.Body>
              <Card.Title>{todayWeather.city_name}</Card.Title>
              <Link to="/style">
                <Button className="mt-5" variant="warning">
                  What should I wear today?
                </Button>
              </Link>
              <Card.Img
                src={`https://www.weatherbit.io/static/img/icons/${todayWeather.weather.icon}.png`}
                alt="Weather background"
              />
              <ListGroup className="list-group-flush">
                <ListGroupItem>
                  Temperature: {todayWeather.temp}°C
                </ListGroupItem>
                <ListGroupItem>
                  Feeling Temperature: {todayWeather.app_temp}°C
                </ListGroupItem>
                <ListGroupItem>
                  Rain: {todayWeather.precip.toFixed(1)}mm/hr
                </ListGroupItem>
                <ListGroupItem>
                  Wind: {todayWeather.wind_cdir}{" "}
                  {todayWeather.wind_spd.toFixed(1)}m/s
                </ListGroupItem>
              </ListGroup>
              <Link to="/forecast">
                <Button className="mt-4" variant="success">
                  Weather forecast
                </Button>
              </Link>
            </Card.Body>
          </Card>
        </div>
      ) : (
        <p></p>
      )}
    </div>
  );
}

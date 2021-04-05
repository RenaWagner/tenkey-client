import React from "react";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  selectTodayWeather,
  selectLoading,
} from "../../store/weather/selectors";

export default function WeatherToday() {
  const todayWeatherArray = useSelector(selectTodayWeather);
  const todayWeather = todayWeatherArray[0];
  const date = todayWeather?.datetime.substr(0, 10);
  const isLoading = useSelector(selectLoading);

  return (
    <div>
      {isLoading ? (
        <div className="d-flex justify-content-center mt-5">
          <div className="spinner-border text-dark" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <p></p>
      )}
      {todayWeather ? (
        <div>
          <h4 className="mt-5">
            Today: {date} in {todayWeather.city_name}
          </h4>
          <Link to="/">
            <p>What should I wear today?</p>
          </Link>
          <img
            src={`https://www.weatherbit.io/static/img/icons/${todayWeather.weather.icon}.png`}
            alt="Weather background"
          />
          <h5>Temperature: {todayWeather.temp}°C</h5>
          <h6>Feeling Temperature: {todayWeather.app_temp}°C</h6>
          <h5 className="mt-3">Rain: {todayWeather.precip}mm/hr</h5>
          <h5>
            Wind: {todayWeather.wind_cdir} {todayWeather.wind_spd.toFixed(1)}m/s
          </h5>
          <Link to="/forecast">
            <Button className="mb-3" variant="info">
              Check the weekly forecast of this location
            </Button>
          </Link>
        </div>
      ) : (
        <p></p>
      )}
    </div>
  );
}

import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectTodayWeather } from "../../store/weather/selectors";

export default function WeatherToday() {
  const todayWeatherArray = useSelector(selectTodayWeather);
  const todayWeather = todayWeatherArray[0];
  const date = todayWeather?.datetime.substr(0, 10);

  return (
    <div>
      {todayWeather ? (
        <div>
          <h4>Today: {date}</h4>
          <Link to="/">
            <p>What should I wear today?</p>
          </Link>
          <img
            src={` https://www.weatherbit.io/static/img/icons/${todayWeather.weather.icon}.png`}
            alt="Weather background"
          />
          <h5>Rain: {todayWeather.precip}mm/hr</h5>
          <h5>
            Wind: {todayWeather.wind_cdir} {todayWeather.wind_spd.toFixed(1)}m/s
          </h5>
        </div>
      ) : (
        <p></p>
      )}
    </div>
  );
}

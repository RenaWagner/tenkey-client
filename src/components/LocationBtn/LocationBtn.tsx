import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import {
  fetchWeatherLocation,
  weatherLoading,
} from "../../store/weather/actions";
import { Link } from "react-scroll";

export default function LocationButton() {
  const dispatch = useDispatch();
  const [currentLocation, setCurrentLocation] = useState({
    lattitude: "",
    longtitude: "",
  });

  const clickedPlace = () => {
    navigator.geolocation.getCurrentPosition(function (position) {
      const lat = position.coords.latitude.toFixed(3);
      const long = position.coords.longitude.toFixed(3);
      setCurrentLocation({ lattitude: lat, longtitude: long });
    });
  };

  useEffect(() => {
    if (currentLocation.lattitude && currentLocation.longtitude) {
      dispatch(fetchWeatherLocation(currentLocation));
    }
  }, [currentLocation, dispatch]);

  return (
    <div>
      <Link to="weatherToday" smooth={true}>
        <Button
          className="mb-3"
          variant="info"
          onClick={() => {
            dispatch(weatherLoading());
            clickedPlace();
          }}
        >
          Check weather at my location
        </Button>
      </Link>
    </div>
  );
}

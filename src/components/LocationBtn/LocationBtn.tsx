import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import {
  fetchForecast,
  fetchWeatherLocation,
} from "../../store/weather/actions";

type Props = {
  data: string;
};

export default function LocationButton(props: Props) {
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
    if (
      currentLocation.lattitude &&
      currentLocation.longtitude &&
      props.data === "current"
    ) {
      dispatch(fetchWeatherLocation(currentLocation));
    } else if (
      currentLocation.lattitude &&
      currentLocation.longtitude &&
      props.data === "forecast"
    ) {
      dispatch(fetchForecast(currentLocation));
    }
  }, [currentLocation, dispatch, props]);

  return (
    <div>
      <Button className="mb-3" variant="info" onClick={() => clickedPlace()}>
        Check weather at my location
      </Button>
    </div>
  );
}

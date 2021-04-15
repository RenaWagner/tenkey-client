import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import {
  fetchWeatherLocation,
  weatherLoading,
} from "../../store/weather/actions";
import { Link } from "react-scroll";
import { useHistory } from "react-router";

type Props = {
  type: string;
};

export default function LocationButton(props: Props) {
  const type = props.type;
  const dispatch = useDispatch();
  const [currentLocation, setCurrentLocation] = useState({
    lattitude: "",
    longtitude: "",
  });
  const history = useHistory();

  function success(position: any) {
    const lat = position.coords.latitude.toFixed(3);
    const long = position.coords.longitude.toFixed(3);
    setCurrentLocation({ lattitude: lat, longtitude: long });
  }
  function error(err: any) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }
  const options = {
    enableHighAccuracy: true,
    timeout: 30000,
    maximumAge: Infinity,
  };

  const clickedPlace = () => {
    console.log("clicked");
    navigator.geolocation.getCurrentPosition(success, error, options);
  };

  useEffect(() => {
    if (currentLocation.lattitude && currentLocation.longtitude) {
      dispatch(fetchWeatherLocation(currentLocation, history, type));
    }
    // eslint-disable-next-line
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
          Current location
        </Button>
      </Link>
    </div>
  );
}

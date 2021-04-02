import React, { useEffect, useState, FormEvent } from "react";
import { useDispatch } from "react-redux";
import WeatherToday from "../../components/WeatherToday/WeatherToday";
import { fetchWeatherLocation } from "../../store/weather/actions";
import cities from "../../data/cities.json";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import LocationButton from "../../components/LocationBtn/LocationBtn";
import LocationInput from "../../components/LocationInput/LocationInput";

type Cities = {
  city_id: number;
  city_name: string;
  state_code: string;
  country_code: string;
  lat: number;
  lon: number;
};

export default function HomePage() {
  const dispatch = useDispatch();
  const [currentLocation, setCurrentLocation] = useState({
    lattitude: "",
    longtitude: "",
  });

  useEffect(() => {
    if (currentLocation.lattitude && currentLocation.longtitude) {
      dispatch(fetchWeatherLocation(currentLocation));
    }
  }, [currentLocation, dispatch]);

  return (
    <div>
      <div
        className="p-5 text-center bg-image"
        style={{
          backgroundImage: `url("https://images.unsplash.com/photo-1445297983845-454043d4eef4?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80")`,
          height: 400,
        }}
      >
        <div className="mask" style={{ backgroundColor: `rgba(0, 0, 0, 0.6)` }}>
          <div className="d-flex justify-content-center align-items-center h-100">
            <div className="text-white">
              <h2 className="mb-3">Welcome to Weather && Clothes</h2>
              <LocationButton data="current" />
              {/* <LocationInput /> */}
            </div>
          </div>
        </div>
      </div>
      <LocationInput />
      <WeatherToday />
    </div>
  );
}

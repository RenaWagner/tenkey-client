import React, { useEffect, useState, FormEvent } from "react";
import { useDispatch } from "react-redux";
import WeatherToday from "../components/WeatherToday";
import { fetchWeatherLocation } from "../store/weather/actions";
import cities from "../data/cities.json";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import LocationButton from "../components/LocationButton";

type Cities = {
  city_id: number;
  city_name: string;
  state_code: string;
  country_code: string;
  lat: number;
  lon: number;
};

type ChosenCities = {
  city: "";
  country: "";
};

export default function HomePage() {
  const dispatch = useDispatch();
  const [currentLocation, setCurrentLocation] = useState({
    lattitude: "",
    longtitude: "",
  });
  const [city, setCity] = useState("");
  const [chosenCities, setChosenCities] = useState<Cities[]>([]);

  useEffect(() => {
    if (currentLocation.lattitude && currentLocation.longtitude) {
      dispatch(fetchWeatherLocation(currentLocation));
    }
  }, [currentLocation, dispatch]);

  const formSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const cityNames = cities.filter((item: any) => {
      return item.city_name === city;
    });
    console.log(cityNames);
    if (!cityNames.length) {
      alert("Cannot find the match with the typed city name");
    } else if (cityNames.length === 1) {
      setCurrentLocation({
        lattitude: cityNames[0].lat.toString(),
        longtitude: cityNames[0].lon.toString(),
      });
      dispatch(fetchWeatherLocation(currentLocation));
    } else {
      setChosenCities(cityNames);
    }
  };
  // console.log("chosenCities", chosenCities);
  // console.log("currentLocation", currentLocation);

  const clickedPlace = () => {
    navigator.geolocation.getCurrentPosition(function (position) {
      const lat = position.coords.latitude.toFixed(3);
      const long = position.coords.longitude.toFixed(3);
      setCurrentLocation({ lattitude: lat, longtitude: long });
    });
  };

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
              {/* <Form.Group className="mb-3" onSubmit={() => formSubmit}>
                <Form.Control
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Find the weather by entering the city name"
                />
                <Button variant="secondary" type="submit">
                  Search
                </Button>
              </Form.Group> */}
            </div>
          </div>
        </div>
      </div>
      <form onSubmit={formSubmit}>
        <label>Find the weather by city name:</label>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {chosenCities.length ? (
        <div>
          Choose the city from below list:
          {chosenCities.map((city) => (
            <button
              key={city.city_id}
              onClick={() => {
                setCurrentLocation({
                  lattitude: city.lat.toString(),
                  longtitude: city.lon.toString(),
                });
                setChosenCities([]);
                setCity("");
              }}
            >
              {city.city_name}, {city.country_code}
            </button>
          ))}
        </div>
      ) : (
        <p></p>
      )}
      <WeatherToday />
    </div>
  );
}

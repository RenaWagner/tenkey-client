import React, { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import cities from "../../data/cities.json";
import { Button, Col } from "react-bootstrap";
import { Form } from "react-bootstrap";
import {
  fetchWeatherLocation,
  weatherLoading,
} from "../../store/weather/actions";
import { Link } from "react-scroll";

type Cities = {
  city_id: number;
  city_name: string;
  state_code: string;
  country_code: string;
  lat: number;
  lon: number;
};

export default function LocationInput() {
  const dispatch = useDispatch();
  const [currentLocation, setCurrentLocation] = useState({
    lattitude: "",
    longtitude: "",
  });
  const [city, setCity] = useState("");
  const [chosenCities, setChosenCities] = useState<Cities[]>([]);

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

  return (
    <div className="mt-2 d-flex justify-content-center align-items-center container">
      <Form onSubmit={formSubmit}>
        <Form.Row>
          <Col sm={8}>
            <Form.Label htmlFor="inlineFormInput" srOnly>
              Search by the city name:
            </Form.Label>
            <Form.Control
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Find the weather"
            />
          </Col>
          <Col xs="auto">
            <Button variant="secondary" type="submit">
              Submit
            </Button>
          </Col>
        </Form.Row>
      </Form>
      {chosenCities.length ? (
        <div>
          Choose the city:{" "}
          {chosenCities.map((city) => (
            <Link to="weatherToday" smooth={true} key={city.city_id}>
              <button
                className="btn btn-light mr-2"
                style={{ height: 37.986 }}
                onClick={() => {
                  const location = {
                    lattitude: city.lat.toString(),
                    longtitude: city.lon.toString(),
                  };
                  setCurrentLocation(location);
                  setChosenCities([]);
                  setCity("");
                  dispatch(weatherLoading());
                  dispatch(fetchWeatherLocation(location));
                }}
              >
                {city.country_code === "US" ? (
                  <p>
                    {city.city_name}, {city.state_code}, {city.country_code}
                  </p>
                ) : (
                  <p>
                    {city.city_name}, {city.country_code}
                  </p>
                )}
              </button>
            </Link>
          ))}
        </div>
      ) : (
        <p></p>
      )}
    </div>
  );
}

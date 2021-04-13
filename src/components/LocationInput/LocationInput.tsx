import React, { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import cities from "../../data/cities.json";
import { Button, Col } from "react-bootstrap";
import { useHistory } from "react-router";
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
  // const [currentLocation, setCurrentLocation] = useState({
  //   lattitude: "",
  //   longtitude: "",
  // });
  const [city, setCity] = useState("");
  const [chosenCities, setChosenCities] = useState<Cities[]>([]);
  const history = useHistory();

  const formSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const cityNames = cities.filter((item: any) => {
      return item.city_name.toLowerCase().indexOf(city.toLowerCase()) >= 0;
    });

    if (!cityNames.length) {
      alert("Cannot find the match with the typed city name");
    } else {
      setChosenCities(cityNames);
    }
    setCity("");
  };

  return (
    <div className="mt-2">
      <Form
        onSubmit={formSubmit}
        className="mt-2 d-flex justify-content-center align-items-center"
      >
        <Form.Row>
          <Col sm={8}>
            <Form.Label htmlFor="inlineFormInput" srOnly>
              Search for location
            </Form.Label>
            <Form.Control
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder=" Search for location"
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
        <div style={{ width: "100%" }}>
          {chosenCities.map((city) => (
            <Link to="weatherToday" smooth={true} key={city.city_id}>
              <button
                className="btn btn-light ml-1 mr-1 mb-1 mt-2"
                style={{ height: 37.986 }}
                onClick={() => {
                  const location = {
                    lattitude: city.lat.toString(),
                    longtitude: city.lon.toString(),
                  };
                  // setCurrentLocation(location);
                  setChosenCities([]);
                  setCity("");
                  dispatch(weatherLoading());
                  dispatch(fetchWeatherLocation(location, history));
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

import React, { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import cities from "../../data/cities.json";
import { Button, Col } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { fetchWeatherLocation } from "../../store/weather/actions";

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
    // console.log("submitted!");
    const cityNames = cities.filter((item: any) => {
      return item.city_name === city;
    });

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
    <div className="mt-5">
      <Form onSubmit={formSubmit} className="mx-auto">
        <Form.Row className="align-items-center">
          <Col sm={6}>
            <Form.Label htmlFor="inlineFormInput" srOnly>
              Search by the city name:
            </Form.Label>
            <Form.Control
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Find the weather by entering the city name"
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
                setTimeout(() => {
                  dispatch(fetchWeatherLocation(currentLocation));
                }, 2000);
              }}
            >
              {city.city_name}, {city.country_code}
            </button>
          ))}
        </div>
      ) : (
        <p></p>
      )}
    </div>
  );
}

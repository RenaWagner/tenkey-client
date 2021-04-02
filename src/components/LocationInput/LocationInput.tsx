import React, { FormEvent, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import cities from "../../data/cities.json";
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
    <div>
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
                dispatch(fetchWeatherLocation(currentLocation));
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
